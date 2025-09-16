import Redis from "ioredis"

// Safe Redis initialization with environment variables
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let redis: Redis;

if (redisUrl && redisToken) {
  redis = new Redis(`rediss://default:${redisToken}@${redisUrl}:6379`);
} else {
  console.warn('Redis Environment variables missing, creating fallback Redis instance');
  redis = new Redis({
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: 1,
    lazyConnect: true,
    connectTimeout: 1000,
    commandTimeout: 1000,
  });
}

export default redis;