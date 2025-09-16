import { NextResponse } from "next/server";

interface SecurityConfig {
  corsOrigin?: string;
  allowMethods?: string[];
  allowHeaders?: string[];
  allowCredentials?: boolean;
  rateLimitRequests?: number;
  rateLimitWindow?: number;
  cspPolicy?: string;
}

const defaultConfig: Required<SecurityConfig> = {
  corsOrigin: process.env.FRONTEND_URL!,
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  allowCredentials: true,
  rateLimitRequests: 100,
  rateLimitWindow: 3600,
  cspPolicy: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'",
};

/**
 * Adds security headers to a NextResponse
 * @param response - The NextResponse object to add headers to
 * @param config - Optional security configuration to override defaults
 * @returns NextResponse with security headers applied
 */
export function addSecurityHeaders(response: NextResponse, config: SecurityConfig = {}): NextResponse {
  const finalConfig = { ...defaultConfig, ...config };

  // CORS
  response.headers.set("Access-Control-Allow-Origin", finalConfig.corsOrigin);
  response.headers.set("Access-Control-Allow-Methods", finalConfig.allowMethods.join(", "));
  response.headers.set("Access-Control-Allow-Headers", finalConfig.allowHeaders.join(", "));
  response.headers.set("Access-Control-Allow-Credentials", finalConfig.allowCredentials.toString());

  // Security
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  response.headers.set("Content-Security-Policy", finalConfig.cspPolicy);
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  // Rate limit info
  response.headers.set("X-RateLimit-Limit", finalConfig.rateLimitRequests.toString());
  response.headers.set("X-RateLimit-Window", finalConfig.rateLimitWindow.toString());

  return response;
}

/**
 * Creates a CORS preflight response with security headers
 * @param config - Optional security configuration
 * @returns NextResponse configured for CORS preflight
 */
export function createCorsResponse(config: SecurityConfig = {}): NextResponse {
  const response = new NextResponse(null, { status: 200 });
  return addSecurityHeaders(response, config);
}

/**
 * Creates a secure JSON response with security headers
 * @param data - Data to include in JSON response
 * @param status - HTTP status code (default: 200)
 * @param config - Optional security configuration
 * @returns NextResponse with JSON data and security headers
 */
export function createSecureResponse(
  data: Record<string, unknown> | string | number | boolean | null,
  status: number = 200,
  config: SecurityConfig = {}
): NextResponse {
  const response = NextResponse.json(data, { status });
  return addSecurityHeaders(response, config);
}

// Auth routes config
export const authConfig: SecurityConfig = {
  allowMethods: ["POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  rateLimitRequests: 5,
  rateLimitWindow: 300,
  cspPolicy: "default-src 'none'; connect-src 'self'",
};