import { generateJWTToken } from '../utils/tokenGenerator';

// Mock jose library
jest.mock('jose', () => ({
  SignJWT: jest.fn().mockImplementation(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setIssuedAt: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    setIssuer: jest.fn().mockReturnThis(),
    setAudience: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue('mocked-jwt-token')
  }))
}));

describe('JWT Token Generator', () => {
  beforeEach(() => {
    // Reset environment
    process.env.JWT_SECRET_KEY = 'test-secret-key-for-jwt-minimum-32-characters-long';
    jest.clearAllMocks();
  });

  describe('generateJWTToken', () => {
    it('should generate JWT token without userId', async () => {
      const result = await generateJWTToken('1h');
      
      expect(result).toBe('mocked-jwt-token');
      expect(typeof result).toBe('string');
    });

    it('should generate JWT token with userId', async () => {
      const result = await generateJWTToken('1h', 'user-123');
      
      expect(result).toBe('mocked-jwt-token');
      expect(typeof result).toBe('string');
    });

    it('should handle different expiration times', async () => {
      // Test different time formats
      const token1h = await generateJWTToken('1h');
      const token30m = await generateJWTToken('30m');
      const token1d = await generateJWTToken('1d');
      const tokenWithUser = await generateJWTToken('2h', 'user-456');

      expect(token1h).toBe('mocked-jwt-token');
      expect(token30m).toBe('mocked-jwt-token');
      expect(token1d).toBe('mocked-jwt-token');
      expect(tokenWithUser).toBe('mocked-jwt-token');
    });
  });
});