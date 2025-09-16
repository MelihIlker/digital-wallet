import edgeRedis from "./edgeRedis";
import { memoryRateLimiter } from "./memoryRateLimiter";

/**
 * Edge Runtime Compatible Rate Limiter
 * 
 * Implements rate limiting using Upstash Redis REST API for edge runtime compatibility.
 * Falls back to memory-based rate limiting if Redis operations fail.
 * 
 * @param ip - The IP address to rate limit
 * @param limit - Maximum requests allowed within the time window
 * @param windowMs - Time window in milliseconds
 * @returns Promise<RateLimitResult> - Object containing rate limit status and metadata
 * 
 * @example
 * ```typescript
 * const result = await edgeRateLimiter("192.168.1.1", 100, 60000);
 * 
 * if (result.success) {
 *   console.log(`Request allowed. ${result.remaining} requests remaining`);
 * } else {
 *   console.log(`Rate limit exceeded. Reset in ${result.resetIn} seconds`);
 * }
 * ```
 */
export async function edgeRateLimiter(ip: string, limit: number, windowMs: number) {
  try {
    if (!ip || typeof ip !== 'string' || ip.length === 0) {
      ip = '127.0.0.1';
    }
    
    const sanitizedIP = ip.replace(/[^a-zA-Z0-9._:-]/g, '').substring(0, 45);
    if (sanitizedIP.length === 0) {
      return await memoryRateLimiter('127.0.0.1', limit, windowMs);
    }
    
    const key = `rate_limiter:${sanitizedIP}`;
    const windowSeconds = Math.floor(windowMs / 1000);
    
    const result = await edgeRedis.incrWithExpire(key, windowSeconds);
    
    return {
      success: result.count <= limit,
      remaining: Math.max(0, limit - result.count),
      resetIn: result.ttl > 0 ? result.ttl : windowSeconds,
    };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Redis error, using memory fallback:', errorMessage);
    return await memoryRateLimiter(ip, limit, windowMs);
  }
}