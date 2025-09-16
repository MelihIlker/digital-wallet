import { rateLimiter } from '../utils/rateLimiter';

// Mock Redis transaction
const mockTransaction = {
  incr: jest.fn(),
  expire: jest.fn(),
  exec: jest.fn(),
};

// Mock the redis module with proper types
jest.mock('../utils/redis', () => ({
  __esModule: true,
  default: {
    multi: jest.fn(),
    ttl: jest.fn(),
  }
}));

// Import the mocked redis after mocking
import redis from '../utils/redis';

// Type definitions for test results
interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetIn: number;
}

describe('Rate Limiter with Redis Backend', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock behavior
    (redis.multi as jest.Mock).mockReturnValue(mockTransaction);
    mockTransaction.incr.mockReturnValue(mockTransaction);
    mockTransaction.expire.mockReturnValue(mockTransaction);
  });

  describe('rateLimiter function', () => {
    it('should allow request when under rate limit', async () => {
      // Mock Redis responses for first request (count = 1)
      mockTransaction.exec.mockResolvedValue([
        [null, 1], // incr result: count = 1
        [null, 'OK'] // expire result
      ]);
      (redis.ttl as jest.Mock).mockResolvedValue(3600); // 1 hour remaining

      const result: RateLimitResult = await rateLimiter('192.168.1.1', 100, 60000);

      expect(result.success).toBe(true);
      expect(result.remaining).toBe(99); // 100 - 1
      expect(result.resetIn).toBe(3600);
      
      // Verify Redis calls
      expect(redis.multi).toHaveBeenCalled();
      expect(mockTransaction.incr).toHaveBeenCalledWith('rate_limiter:192.168.1.1');
      expect(mockTransaction.expire).toHaveBeenCalledWith('rate_limiter:192.168.1.1', 60);
    });

    it('should block request when rate limit exceeded', async () => {
      // Mock Redis responses for request exceeding limit (count = 101)
      mockTransaction.exec.mockResolvedValue([
        [null, 101], // incr result: count = 101 (exceeds limit of 100)
        [null, 'OK'] // expire result
      ]);
      (redis.ttl as jest.Mock).mockResolvedValue(1800); // 30 minutes remaining

      const result: RateLimitResult = await rateLimiter('192.168.1.1', 100, 60000);

      expect(result.success).toBe(false);
      expect(result.remaining).toBe(0); // Math.max(0, 100 - 101) = 0
      expect(result.resetIn).toBe(1800);
    });

    it('should handle exact rate limit boundary', async () => {
      // Mock Redis responses for request at exact limit (count = 100)
      mockTransaction.exec.mockResolvedValue([
        [null, 100], // incr result: count = 100 (exactly at limit)
        [null, 'OK'] // expire result
      ]);
      (redis.ttl as jest.Mock).mockResolvedValue(2400); // 40 minutes remaining

      const result: RateLimitResult = await rateLimiter('10.0.0.1', 100, 3600000);

      expect(result.success).toBe(true); // count <= limit (100 <= 100)
      expect(result.remaining).toBe(0); // 100 - 100 = 0
      expect(result.resetIn).toBe(2400);
    });

    it('should handle different IP addresses independently', async () => {
      // Test IP1
      mockTransaction.exec.mockResolvedValue([
        [null, 5], // count = 5 for IP1
        [null, 'OK']
      ]);
      (redis.ttl as jest.Mock).mockResolvedValue(1200);

      const result1: RateLimitResult = await rateLimiter('192.168.1.1', 10, 30000);

      expect(result1.success).toBe(true);
      expect(result1.remaining).toBe(5); // 10 - 5
      expect(mockTransaction.incr).toHaveBeenCalledWith('rate_limiter:192.168.1.1');

      // Reset mocks for second IP
      jest.clearAllMocks();
      (redis.multi as jest.Mock).mockReturnValue(mockTransaction);
      mockTransaction.incr.mockReturnValue(mockTransaction);
      mockTransaction.expire.mockReturnValue(mockTransaction);

      // Test IP2
      mockTransaction.exec.mockResolvedValue([
        [null, 2], // count = 2 for IP2
        [null, 'OK']
      ]);
      (redis.ttl as jest.Mock).mockResolvedValue(1200);

      const result2: RateLimitResult = await rateLimiter('10.0.0.1', 10, 30000);

      expect(result2.success).toBe(true);
      expect(result2.remaining).toBe(8); // 10 - 2
      expect(mockTransaction.incr).toHaveBeenCalledWith('rate_limiter:10.0.0.1');
    });

    it('should handle different time windows correctly', async () => {
      mockTransaction.exec.mockResolvedValue([
        [null, 1],
        [null, 'OK']
      ]);
      (redis.ttl as jest.Mock).mockResolvedValue(30);

      // Test 30-second window
      await rateLimiter('192.168.1.1', 5, 30000);
      expect(mockTransaction.expire).toHaveBeenCalledWith('rate_limiter:192.168.1.1', 30);

      // Reset for next test
      jest.clearAllMocks();
      (redis.multi as jest.Mock).mockReturnValue(mockTransaction);
      mockTransaction.incr.mockReturnValue(mockTransaction);
      mockTransaction.expire.mockReturnValue(mockTransaction);

      mockTransaction.exec.mockResolvedValue([
        [null, 1],
        [null, 'OK']
      ]);
      (redis.ttl as jest.Mock).mockResolvedValue(3600);

      // Test 1-hour window
      await rateLimiter('192.168.1.1', 100, 3600000);
      expect(mockTransaction.expire).toHaveBeenCalledWith('rate_limiter:192.168.1.1', 3600);
    });

    it('should handle Redis transaction errors gracefully', async () => {
      // Mock Redis transaction returning null/undefined results
      mockTransaction.exec.mockResolvedValue([
        [null, null], // No result from incr
        [null, 'OK']
      ]);
      (redis.ttl as jest.Mock).mockResolvedValue(1800);

      const result: RateLimitResult = await rateLimiter('192.168.1.1', 100, 60000);

      // Should fail-safe: deny request when Redis operation fails
      expect(result.success).toBe(false);
      expect(result.remaining).toBe(0);
      expect(result.resetIn).toBe(60); // windowMs / 1000
    });

    it('should parse string count values from Redis', async () => {
      // Mock Redis returning string instead of number
      mockTransaction.exec.mockResolvedValue([
        [null, '50'], // String value from Redis
        [null, 'OK']
      ]);
      (redis.ttl as jest.Mock).mockResolvedValue(900);

      const result: RateLimitResult = await rateLimiter('192.168.1.1', 100, 60000);

      expect(result.success).toBe(true);
      expect(result.remaining).toBe(50); // 100 - 50
      expect(result.resetIn).toBe(900);
    });

    it('should handle edge case with high request counts', async () => {
      // Mock very high request count
      mockTransaction.exec.mockResolvedValue([
        [null, 9999], // Very high count
        [null, 'OK']
      ]);
      (redis.ttl as jest.Mock).mockResolvedValue(60);

      const result: RateLimitResult = await rateLimiter('192.168.1.1', 10, 60000);

      expect(result.success).toBe(false);
      expect(result.remaining).toBe(0); // Math.max(0, 10 - 9999) = 0
      expect(result.resetIn).toBe(60);
    });
  });
});
