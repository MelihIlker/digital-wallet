import redis from "./redis";
import { memoryRateLimiter } from "./memoryRateLimiter";

/**
 * Rate Limiter with Redis Backend and Memory Fallback
 *
 * Implements a sliding window rate limiter using Redis to control request frequency
 * from specific IP addresses. Automatically falls back to in-memory rate limiting
 * if Redis is unavailable or encounters errors.
 *
 * @param ip - The IP address to track and rate limit (e.g., "192.168.1.1")
 * @param limit - Maximum number of requests allowed within the time window (e.g., 100)
 * @param windowMs - Time window in milliseconds for rate limiting (e.g., 60000 for 1 minute)
 *
 * @returns Promise<RateLimitResult> - Object containing limit status and metadata
 *
 * @example
 * ```typescript
 * // Allow 100 requests per minute
 * const result = await rateLimiter("192.168.1.1", 100, 60000);
 *
 * // Allow 10 requests per 30 seconds
 * const result = await rateLimiter("10.0.0.1", 10, 30000);
 *
 * // Check if request should be allowed
 * if (result.success) {
 *   console.log(`Request allowed. ${result.remaining} requests remaining`);
 * } else {
 *   console.log(`Rate limit exceeded. Reset in ${result.resetIn} seconds`);
 * }
 * ```
 *
 * @interface RateLimitResult
 * @property {boolean} success - Whether the request is within rate limits
 * @property {number} remaining - Number of requests remaining in current window
 * @property {number} resetIn - Seconds until the rate limit window resets
 */
export async function rateLimiter(ip: string, limit: number, windowMs: number) {
  try {
    // Validate and sanitize input parameters
    if (!ip || typeof ip !== 'string' || ip.length === 0) {
      ip = '127.0.0.1';
    }
    
    // Sanitize IP for Redis key (remove potentially problematic characters)
    const sanitizedIP = ip.replace(/[^a-zA-Z0-9._:-]/g, '').substring(0, 45);
    
    if (sanitizedIP.length === 0) {
      // Use memory fallback for invalid IPs
      return await memoryRateLimiter('127.0.0.1', limit, windowMs);
    }
    
    const key = `rate_limiter:${sanitizedIP}`;
    const windowSeconds = Math.floor(windowMs / 1000);
    
    const tx = redis.multi();
    tx.incr(key);
    tx.expire(key, windowSeconds);
    const results = await tx.exec();
    
    let count = 0;
    let redisSuccessful = false;

    if (
      results &&
      Array.isArray(results) &&
      results[0] &&
      results[0][1] !== undefined &&
      results[0][1] !== null
    ) {
      count =
        typeof results[0][1] === "number"
          ? results[0][1]
          : parseInt(results[0][1] as string, 10);
      redisSuccessful = !isNaN(count);
    }

    if (redisSuccessful) {
      const ttl = await redis.ttl(key);
      return {
        success: count <= limit,
        remaining: Math.max(0, limit - count),
        resetIn: ttl > 0 ? ttl : windowSeconds,
      };
    } else {
      // Redis failed, fallback to memory
      return await memoryRateLimiter(ip, limit, windowMs);
    }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Redis error, using memory fallback:', errorMessage);
    return await memoryRateLimiter(ip, limit, windowMs);
  }
}
