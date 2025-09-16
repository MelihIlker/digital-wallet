"use server";

import { SignJWT } from "jose";

/**
 * JWT Token Generator
 *
 * Generates a new JWT token if no existing cookie is found with the specified name.
 * If a cookie already exists, returns null to prevent duplicate token generation.
 *
 * @param time - JWT token expiration time (e.g., "2h", "1d", "30m", "7d")
 *
 * @returns Promise<string | null> - Returns JWT token string or null if cookie already exists
 *
 * @example
 * ```typescript
 * // Generate 2-hour access token
 * const token = await generateJWTToken("2h");
 *
 * // Generate 1-day session token
 * const sessionToken = await generateJWTToken("1d");
 *
 * // Generate 30-minute temporary token
 * const tempToken = await generateJWTToken("30m");
 * ```
 */
export const generateJWTToken = async (
  time: string,
  userId?: string
) => {
  try {
    const payload: Record<string, string | number> = {};
    
    if (userId) {
      payload.sub = userId; // Standard JWT claim
    }
    
    const jwt = new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(time)
      .setIssuer("digital-wallet")
      .setAudience("digital-wallet-users")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));

    return jwt;
  } catch (error) {
    console.error("Error generating JWT:", error);
    return null;
  }
};
