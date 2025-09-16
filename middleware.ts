import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "./helper/dbQueries";
import { edgeRateLimiter } from "./utils/edgeRateLimiter";
import {
  authConfig,
  createCorsResponse,
} from "./utils/securityHeaders";

const RATE_LIMITS = {
  GLOBAL: {
    requests: 100, // 100 requests per minute
    windowMs: 60000, // 1 minute
  },
  NAVIGATION: {
    requests: 30, // 30 page changes per minute
    windowMs: 60000, // 1 minute
  },
  API: {
    requests: 50, // 50 API requests per minute
    windowMs: 60000, // 1 minute
  },
};

const routeProtection: Record<string, string[]> = {
  "/admin": ["admin"],
  "/admin/*": ["admin"],
  "/user": ["user", "admin"],
  "/user/*": ["user", "admin"],
  "/api/admin/*": ["admin"],
  "/api/user/*": ["user", "admin"],
};

const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/register",
  "/features",
  "/pricing",  
  "/security",      
  "/rate-limit",
  "/api/auth/*",
];

function getRequiredRoles(pathname: string): string[] | null {
  if (routeProtection[pathname]) {
    return routeProtection[pathname];
  }

  for (const [route, roles] of Object.entries(routeProtection)) {
    if (route.endsWith("/*")) {
      const baseRoute = route.slice(0, -2);
      if (pathname.startsWith(baseRoute)) {
        return roles;
      }
    }
  }

  return null;
}

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => {
    if (route.endsWith("/*")) {
      return pathname.startsWith(route.slice(0, -2));
    }
    return pathname === route;
  });
}

function getClientIP(req: NextRequest): string {
  const ipHeader =
    req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
  const ip = ipHeader.split(",")[0].trim();
  
  if (!ip || ip.length === 0) {
    return "127.0.0.1";
  }
  
  if (ip === "::1") return "127.0.0.1"; // IPv6 localhost to IPv4
  
  return ip;
}

export async function OPTIONS() {
  return createCorsResponse(authConfig);
}

export async function middleware(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const ip = getClientIP(req);

    if (isPublicRoute(pathname)) {
      return NextResponse.next();
    }

    console.log('[Middleware] Processing:', pathname, 'IP:', ip);

    try {
      const globalKey = `global_${ip}`;
      
      const globalLimit = await edgeRateLimiter(
        globalKey,
        RATE_LIMITS.GLOBAL.requests,
        RATE_LIMITS.GLOBAL.windowMs
      );

      if (!globalLimit.success) {
        const rateLimitUrl = new URL('/rate-limit', req.url);
        rateLimitUrl.searchParams.set('retryAfter', globalLimit.resetIn.toString());
        rateLimitUrl.searchParams.set('limit', RATE_LIMITS.GLOBAL.requests.toString());
        rateLimitUrl.searchParams.set('type', 'global');
        
        return NextResponse.redirect(rateLimitUrl);
      }
    } catch (rateLimitError) {
      console.error("Global rate limiting error:", rateLimitError);
    }

    // API-specific rate limiting
    if (pathname.startsWith("/api/")) {
      try {
        const apiLimit = await edgeRateLimiter(
          `api_${ip}`,
          RATE_LIMITS.API.requests,
          RATE_LIMITS.API.windowMs
        );

        if (!apiLimit.success) {
          // For API routes, return JSON response instead of redirect
          return new NextResponse(
            JSON.stringify({
              error: 'API Rate Limit Exceeded',
              retryAfter: apiLimit.resetIn,
              limit: RATE_LIMITS.API.requests,
              type: 'api'
            }),
            { 
              status: 429,
              headers: {
                'Content-Type': 'application/json',
                "Retry-After": apiLimit.resetIn.toString(),
                "X-RateLimit-Limit": RATE_LIMITS.API.requests.toString(),
                "X-RateLimit-Remaining": "0",
              },
            }
          );
        }
      } catch (rateLimitError) {
        console.error("API rate limiting error:", rateLimitError);
      }
    }

    if (!pathname.startsWith("/api/") && !pathname.startsWith("/_next/")) {
      try {
        const navKey = `nav_${ip}`;
        
        const navLimit = await edgeRateLimiter(
          navKey,
          RATE_LIMITS.NAVIGATION.requests,
          RATE_LIMITS.NAVIGATION.windowMs
        );

        if (!navLimit.success) {
          const rateLimitUrl = new URL('/rate-limit', req.url);
          rateLimitUrl.searchParams.set('retryAfter', navLimit.resetIn.toString());
          rateLimitUrl.searchParams.set('limit', RATE_LIMITS.NAVIGATION.requests.toString());
          rateLimitUrl.searchParams.set('type', 'navigation');
          
          return NextResponse.redirect(rateLimitUrl);
        }
      } catch (rateLimitError) {
        console.error("Navigation rate limiting error:", rateLimitError);
      }
    }

    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const user = await getUserFromToken(accessToken);
    if (!user) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    const userRole = user.is_admin ? "admin" : "user";
    const requiredRoles = getRequiredRoles(pathname);

    if (requiredRoles && !requiredRoles.includes(userRole)) {
      const redirectUrl = user.is_admin ? "/admin" : "/user";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.error();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
