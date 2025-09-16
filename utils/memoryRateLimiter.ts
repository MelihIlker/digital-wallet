/**
 * In-Memory Rate Limiter
 * 
 * A memory-based rate limiter that doesn't require Redis.
 * Uses a Map to store request counts with automatic cleanup.
 * Perfect for development and fallback scenarios.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * Clean up expired entries from memory
 */
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

/**
 * Memory-based rate limiter
 * 
 * Implements sliding window rate limiting using in-memory storage.
 * Automatically cleans up expired entries to prevent memory leaks.
 * 
 * @param ip - The IP address to rate limit
 * @param limit - Maximum requests allowed within the time window
 * @param windowMs - Time window in milliseconds
 * @returns Promise<RateLimitResult> - Object containing rate limit status and metadata
 * 
 * @example
 * ```typescript
 * const result = await memoryRateLimiter("192.168.1.1", 100, 60000);
 * 
 * if (result.success) {
 *   console.log(`Request allowed. ${result.remaining} requests remaining`);
 * } else {
 *   console.log(`Rate limit exceeded. Reset in ${result.resetIn} seconds`);
 * }
 * ```
 */
export async function memoryRateLimiter(
  ip: string, 
  limit: number, 
  windowMs: number
) {
  if (!ip || typeof ip !== 'string') {
    ip = '127.0.0.1';
  }
  
  const sanitizedIP = ip.replace(/[^a-zA-Z0-9._:-]/g, '').substring(0, 45);
  const key = `rate_limit:${sanitizedIP}`;
  const now = Date.now();
  const resetTime = now + windowMs;

  // Periodic cleanup (10% chance)
  if (Math.random() < 0.1) {
    cleanupExpiredEntries();
  }

  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime
    });
    
    return {
      success: true,
      remaining: limit - 1,
      resetIn: Math.floor(windowMs / 1000)
    };
  }

  entry.count += 1;
  
  const success = entry.count <= limit;
  const remaining = Math.max(0, limit - entry.count);
  const resetIn = Math.max(0, Math.floor((entry.resetTime - now) / 1000));

  return {
    success,
    remaining,
    resetIn
  };
}