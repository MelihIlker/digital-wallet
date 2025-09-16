/**
 * Edge Runtime Compatible Redis Client
 * 
 * Uses Upstash REST API instead of ioredis for edge runtime compatibility.
 * Handles Redis operations through HTTP requests to work in Next.js middleware.
 */

const UPSTASH_REDIS_REST_URL = "https://loved-pika-39775.upstash.io";
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

interface RedisResponse<T = unknown> {
  result: T;
  error?: string;
}

class EdgeRedis {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.baseUrl = UPSTASH_REDIS_REST_URL;
    this.token = UPSTASH_REDIS_REST_TOKEN;
  }

  /**
   * Execute Redis command via REST API
   * 
   * @param command - Redis command array (e.g., ['GET', 'key'])
   * @returns Promise<T> - Command result
   */
  private async request<T = unknown>(command: string[]): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(command),
      });

      if (!response.ok) {
        throw new Error(`Redis request failed: ${response.status}`);
      }

      const data: RedisResponse<T> = await response.json();
      
      if (data.error) {
        throw new Error(`Redis error: ${data.error}`);
      }

      return data.result;
    } catch (error) {
      console.error('Edge Redis request failed:', error);
      throw error;
    }
  }

  /**
   * Increment key value
   * 
   * @param key - Redis key to increment
   * @returns Promise<number> - New value after increment
   */
  async incr(key: string): Promise<number> {
    return await this.request<number>(['INCR', key]);
  }

  /**
   * Set expiration for key
   * 
   * @param key - Redis key
   * @param seconds - Expiration time in seconds
   * @returns Promise<number> - 1 if timeout was set, 0 if key doesn't exist
   */
  async expire(key: string, seconds: number): Promise<number> {
    return await this.request<number>(['EXPIRE', key, seconds.toString()]);
  }

  /**
   * Get time to live for key
   * 
   * @param key - Redis key
   * @returns Promise<number> - TTL in seconds (-1 if no expiry, -2 if key doesn't exist)
   */
  async ttl(key: string): Promise<number> {
    return await this.request<number>(['TTL', key]);
  }

  /**
   * Atomic increment with expiration
   * 
   * Increments a key and sets expiration if it's a new key.
   * This is a common pattern for rate limiting.
   * 
   * @param key - Redis key to increment
   * @param seconds - Expiration time in seconds
   * @returns Promise<{count: number, ttl: number}> - Current count and remaining TTL
   */
  async incrWithExpire(key: string, seconds: number): Promise<{ count: number; ttl: number }> {
    try {
      const count = await this.incr(key);
      
      if (count === 1) {
        await this.expire(key, seconds);
      }
      
      const ttl = await this.ttl(key);
      
      return { count, ttl };
    } catch (error) {
      console.error('Edge Redis transaction failed:', error);
      throw error;
    }
  }
}

const edgeRedis = new EdgeRedis();
export default edgeRedis;