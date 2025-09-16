"use server";

import { supabase } from "@/utils/supabase/client";
import argon2 from "argon2";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { parseUserAgent } from "@/utils/parseUserAgent";
import { rateLimiter } from "@/utils/rateLimiter";
import { generateJWTToken } from "@/utils/tokenGenerator";
import {
  createSecureResponse,
  createCorsResponse,
  authConfig,
} from "@/utils/securityHeaders";
import { getUserByEmailForAuth } from "@/helper/dbQueries";

// Constants
const RATE_LIMIT = {
  REQUESTS: 5,
  WINDOW: 300000, // 5 minutes
  BOT_PENALTY: 3600000, // 1 hour
};

const TOKEN_EXPIRY = {
  ACCESS_TOKEN: "3h",
  REFRESH_TOKEN: "7d",
  ACCESS_TOKEN_SECONDS: 10800, // 3 hours
  REFRESH_TOKEN_MS: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Helper function to extract IP address
function getClientIP(req: NextRequest): string {
  const ipHeader =
    req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
  return ipHeader.split(",")[0].trim() || "unknown";
}

// Helper function to validate email format
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to sanitize user input
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

// Helper function to validate input parameters
function validateLoginInputs(
  email: string,
  password: string,
  fingerprint: string
): {
  isValid: boolean;
  message?: string;
} {
  if (!email || typeof email !== "string") {
    return { isValid: false, message: "Email is required" };
  }

  if (!password || typeof password !== "string") {
    return { isValid: false, message: "Password is required" };
  }

  if (!validateEmail(email.trim())) {
    return { isValid: false, message: "Please enter a valid email address" };
  }

  if (password.length === 0) {
    return { isValid: false, message: "Password cannot be empty" };
  }

  if (fingerprint && fingerprint.length > 1000) {
    return { isValid: false, message: "Invalid request data" };
  }

  return { isValid: true };
}

// Helper function to handle bot detection
async function handleBotDetection(
  req: NextRequest,
  fingerprint: string,
  ipAddress: string
) {
  console.warn("Bot detected:", {
    ip: req.headers.get("x-forwarded-for"),
    fingerprint,
  });

  await rateLimiter(ipAddress, 1, RATE_LIMIT.BOT_PENALTY);
  return createSecureResponse(
    { message: "Email or password is incorrect." },
    403,
    authConfig
  );
}

// Helper function to verify user credentials
async function verifyCredentials(email: string, password: string) {
  const user = await getUserByEmailForAuth(email);

  if (!user) {
    return { isValid: false, user: null };
  }

  const isPasswordValid = await argon2.verify(user.password, password);
  return { isValid: isPasswordValid, user };
}

// Helper function to update last login
async function updateLastLogin(userId: string) {
  await supabase
    .from("users")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", userId);
}

// Helper function to create user session
async function createUserSession(
  userId: string,
  refreshToken: string,
  fingerprint: string,
  ipAddress: string,
  userAgent: string
) {
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY.REFRESH_TOKEN_MS);

  const { error } = await supabase.from("user_sessions").insert({
    user_id: userId,
    token: refreshToken,
    fingerprint,
    ip_address: ipAddress,
    user_agent: userAgent,
    expires_at: expiresAt.toISOString(),
    device_info: JSON.stringify(parseUserAgent(userAgent)),
    last_used_at: new Date().toISOString(),
  });

  return error;
}

// Helper function to set access token cookie
async function setAccessTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", token ?? "", {
    path: "/",
    maxAge: TOKEN_EXPIRY.ACCESS_TOKEN_SECONDS,
    sameSite: "strict",
    secure: true,
    httpOnly: true,
  });
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return createCorsResponse(authConfig);
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, fingerprint, honeypot } = await req.json();
    const ipAddress = getClientIP(req);

    const { success } = await rateLimiter(
      ipAddress,
      RATE_LIMIT.REQUESTS,
      RATE_LIMIT.WINDOW
    );
    if (!success) {
      return createSecureResponse(
        { message: `Too many requests, please try again later.` },
        429,
        authConfig
      );
    }

    if (honeypot) {
      return await handleBotDetection(req, fingerprint, ipAddress);
    }

    const inputValidation = validateLoginInputs(email, password, fingerprint);
    if (!inputValidation.isValid) {
      return createSecureResponse(
        { message: inputValidation.message },
        400,
        authConfig
      );
    }

    const sanitizedEmail = sanitizeInput(email);

    const { isValid, user } = await verifyCredentials(sanitizedEmail, password);
    if (!isValid || !user) {
      return createSecureResponse(
        { message: "Email or password is incorrect" },
        401,
        authConfig
      );
    }

    await updateLastLogin(user.id);

    const refreshToken = await generateJWTToken(
      TOKEN_EXPIRY.REFRESH_TOKEN,
      user.id
    );
    const accessToken = await generateJWTToken(
      TOKEN_EXPIRY.ACCESS_TOKEN,
      user.id
    );

    if (!refreshToken || !accessToken) {
      return createSecureResponse(
        { message: "Failed to generate authentication tokens" },
        500,
        authConfig
      );
    }

    await setAccessTokenCookie(accessToken);

    const userAgent = req.headers.get("user-agent") || "";
    const sessionError = await createUserSession(
      user.id,
      refreshToken,
      fingerprint || "",
      ipAddress,
      userAgent
    );

    if (sessionError) {
      console.error("Session register error:", sessionError);
      return createSecureResponse(
        { message: "Login successful but session wasn't registered." },
        500,
        authConfig
      );
    }

    const redirectUrl = user.is_admin ? "/admin" : "/user";
    return createSecureResponse(
      {
        message: "Logged in successfully",
        redirect: redirectUrl,
      },
      200,
      authConfig
    );
  } catch (error) {
    console.error("Login API unexpected error:", error);
    return createSecureResponse(
      { message: "An unexpected error occurred" },
      500,
      authConfig
    );
  }
}
