import { supabase } from "@/utils/supabase/client";
import { jwtVerify } from "jose";

/**
 * Get all users from the database
 *
 * Retrieves all user records excluding sensitive information like passwords.
 *
 * @returns Promise<Array | null> - Array of user objects or null if error occurs
 *
 * @example
 * ```typescript
 * const users = await getAllUsers();
 * if (users) {
 *   console.log(`Found ${users.length} users`);
 * }
 * ```
 */
export async function getAllUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, username, is_admin, is_verified, created_at");

  if (error) {
    console.error("DB Query Error - getAllUsers:", error.message);
    return null;
  }

  return data;
}

/**
 * Get a user by their ID
 *
 * Retrieves a single user record by their unique identifier.
 *
 * @param userId - The unique identifier of the user
 * @returns Promise<Object | null> - User object or null if not found/error
 *
 * @example
 * ```typescript
 * const user = await getUserById("123e4567-e89b-12d3-a456-426614174000");
 * if (user) {
 *   console.log(`User: ${user.username}`);
 * }
 * ```
 */
export async function getUserById(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, username, is_admin, is_verified, created_at")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("DB Query Error - getUserById:", error.message);
    return null;
  }

  return data;
}

/**
 * Get a user by their email
 *
 * Retrieves a user record by email address with optional query behavior.
 *
 * @param email - The email address of the user (case insensitive)
 * @param maybeSingle - Optional: if true, uses maybeSingle() instead of single() query
 * @returns Promise<Object | null> - User object or null if not found/error
 *
 * @example
 * ```typescript
 * // Standard query (throws if multiple results)
 * const user = await getUserByEmail("user@example.com");
 *
 * // Safe query (returns null if multiple results)
 * const safeUser = await getUserByEmail("user@example.com", true);
 * ```
 */
export async function getUserByEmail(email: string, maybeSingle?: boolean) {
  if (maybeSingle) {
    const { data, error } = await supabase
      .from("users")
      .select("id, email, username, is_admin, is_verified, created_at")
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (error) {
      console.error("DB Query Error - getUserByEmail:", error.message);
      return null;
    }

    return data;
  }

  const { data, error } = await supabase
    .from("users")
    .select("id, email, username, is_admin, is_verified, created_at")
    .eq("email", email.toLowerCase())
    .single();

  if (error) {
    console.error("DB Query Error - getUserByEmail:", error.message);
    return null;
  }

  return data;
}

/**
 * Get a user by their email for authentication (includes password)
 *
 * Retrieves a user record including the password field for authentication purposes.
 * ⚠️ WARNING: This function returns sensitive data and should only be used for login.
 *
 * @param email - The email address of the user (case insensitive)
 * @returns Promise<Object | null> - User object with password field or null if not found/error
 *
 * @example
 * ```typescript
 * const user = await getUserByEmailForAuth("user@example.com");
 * if (user) {
 *   const isValid = await argon2.verify(user.password, inputPassword);
 * }
 * ```
 */
export async function getUserByEmailForAuth(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, password, username, is_admin, is_verified")
    .eq("email", email.toLowerCase())
    .single();

  if (error) {
    console.error("DB Query Error - getUserByEmailForAuth:", error.message);
    return null;
  }

  return data;
}

/**
 * Create a new user in the database
 * @param userData - User data object (email, password, username, fullname, phone)
 * @returns Promise<Object | null> - Created user object or null if error
 */
export async function createUser(userData: {
  email: string;
  password: string;
  username: string;
  fullname: string;
  phone: string;
}) {
  const { data, error } = await supabase
    .from("users")
    .insert({
      email: userData.email.toLowerCase(),
      password: userData.password,
      username: userData.username,
      fullname: userData.fullname,
      phone: userData.phone,
      is_admin: false,
      is_verified: false,
      created_at: new Date().toISOString(),
    })
    .select("id, email, username, fullname")
    .single();

  if (error) {
    console.error("DB Query Error - createUser:", error.message);
    return null;
  }

  return data;
}

/**
 * Create a wallet for a user
 * @param walletData - Wallet data object with user_id
 * @returns Promise<Object | null> - Created wallet object or null if error
 */
export async function createWallet(walletData: { user_id: string }) {
  const { data, error } = await supabase
    .from("wallets")
    .insert({
      user_id: walletData.user_id,
      balance: 0.0,
      currency: "USD",
      created_at: new Date().toISOString(),
    })
    .select("id, user_id, balance, currency")
    .single();

  if (error) {
    console.error("DB Query Error - createWallet:", error.message);
    return null;
  }

  return data;
}

/**
 * Get user from JWT token
 * @param token - JWT token string
 * @returns Promise<Object | null> - User object or null if invalid/expired
 * @example
 * ```typescript
 * const user = await getUserFromToken(token);
 * if (user) {
 *  console.log(`User ID: ${user.id}`);
 * }
 * ```
 * */
export async function getUserFromToken(token: string) {
  try {
    if (!token) return null;

    const decoded = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );
    const userId = decoded.payload.sub as string;

    if (!userId) return null;

    const { data, error } = await supabase
      .from("users")
      .select("id, email, username, is_admin, is_verified, created_at")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("DB Query Error - getUserFromToken:", error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
}
