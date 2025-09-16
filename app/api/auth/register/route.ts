"use server";

import { createUser, createWallet, getUserByEmail } from "@/helper/dbQueries";
import { rateLimiter } from "@/utils/rateLimiter";
import { supabase } from "@/utils/supabase/client";
import {
  createSecureResponse,
  createCorsResponse,
  authConfig,
} from "@/utils/securityHeaders";
import argon2 from "argon2";
import { NextRequest } from "next/server";

const RATE_LIMIT = {
  REQUESTS: 3, // 3 requests
  WINDOW: 300000, // 5 minutes
  BOT_PENALTY: 3600000, // 1 hour
};

const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL: true,
};

// Helper function to extract IP address
function getClientIP(req: NextRequest): string {
  const ipHeader =
    req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
  return ipHeader.split(",")[0].trim() || "unknown";
}

// Helper function to validate password strength
function validatePassword(password: string): {
  isValid: boolean;
  message?: string;
} {
  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long",
    };
  }

  if (PASSWORD_REQUIREMENTS.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter",
    };
  }

  if (PASSWORD_REQUIREMENTS.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter",
    };
  }

  if (PASSWORD_REQUIREMENTS.REQUIRE_NUMBER && !/\d/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one number",
    };
  }

  if (
    PASSWORD_REQUIREMENTS.REQUIRE_SPECIAL &&
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    return {
      isValid: false,
      message: "Password must contain at least one special character",
    };
  }

  return { isValid: true };
}

// Helper function to validate phone number
function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

// Helper function to handle bot detection
async function handleBotDetection(
  req: NextRequest,
  fingerprint: string,
  ipAddress: string
) {
  console.warn("Bot detected in registration:", {
    ip: req.headers.get("x-forwarded-for"),
    fingerprint,
  });

  await rateLimiter(ipAddress, 1, RATE_LIMIT.BOT_PENALTY);
  return createSecureResponse(
    { message: "Invalid registration attempt." },
    403,
    authConfig
  );
}

// Helper function to validate email format
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to check if email is already registered
async function verifyEmailNotRegistered(email: string) {
  const checkEmail = await getUserByEmail(email, true);

  if (checkEmail) {
    return { exist: true };
  }

  return { exist: false };
}

// Helper function to generate a unique username based on email
async function generateUniqueUsername(email: string): Promise<string> {
  const baseUsername = email
    .split("@")[0]
    .replace(/[^a-zA-Z0-9_]/g, "")
    .toLowerCase()
    .substring(0, 15); // Limit length

  if (baseUsername.length < 3) {
    return `user_${Math.floor(Math.random() * 100000)}`;
  }

  let username = baseUsername;
  let counter = 1;

  while (counter < 1000) {
    const { data } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (!data) return username;

    username = `${baseUsername}_${counter}`;
    counter++;
  }

  // Fallback with random number
  return `${baseUsername}_${Math.floor(Math.random() * 99999)}`;
}

// Helper function to hash password
async function setPasswordHash(password: string) {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });
}

// Helper function to sanitize user input
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return createCorsResponse(authConfig);
}

export async function POST(req: NextRequest) {
  try {
    const { fullname, email, phone, password, honeypot, fingerprint } =
      await req.json();
    const ipAddress = getClientIP(req);

    const sanitizedFullname = sanitizeInput(fullname);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPhone = sanitizeInput(phone);

    const { success } = await rateLimiter(
      ipAddress,
      RATE_LIMIT.REQUESTS,
      RATE_LIMIT.WINDOW
    );
    if (!success) {
      return createSecureResponse(
        { message: "Too many registration attempts, please try again later." },
        429,
        authConfig
      );
    }

    if (honeypot) {
      return await handleBotDetection(req, fingerprint, ipAddress);
    }

    if (!validateEmail(sanitizedEmail)) {
      return createSecureResponse(
        { message: "Please enter a valid email address." },
        400,
        authConfig
      );
    }

    if (!validatePhone(sanitizedPhone)) {
      return createSecureResponse(
        { message: "Please enter a valid phone number." },
        400,
        authConfig
      );
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return createSecureResponse(
        { message: passwordValidation.message },
        400,
        authConfig
      );
    }

    const { exist } = await verifyEmailNotRegistered(sanitizedEmail);
    if (exist) {
      return createSecureResponse(
        { message: "This email is already registered." },
        409,
        authConfig
      );
    }

    const hashedPassword = await setPasswordHash(password);
    const username = await generateUniqueUsername(email);

    const user = await createUser({
      email: sanitizedEmail,
      password: hashedPassword,
      username,
      fullname: sanitizedFullname,
      phone: sanitizedPhone,
    });

    if (!user) {
      return createSecureResponse(
        { message: "Failed to create user account" },
        500,
        authConfig
      );
    }

    const wallet = await createWallet({ user_id: user.id });

    if (!wallet) {
      return createSecureResponse(
        { message: "User created but failed to create wallet." },
        500,
        authConfig
      );
    }

    return createSecureResponse(
      {
        message: "Account created successfully! Please login to continue.",
        redirect: "/auth/login",
      },
      201,
      authConfig
    );
  } catch (error) {
    console.error("Register API unexpected error:", error);
    return createSecureResponse(
      { message: "An unexpected error occurred" },
      500,
      authConfig
    );
  }
}
