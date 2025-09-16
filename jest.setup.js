process.env.JWT_SECRET_KEY = 'test-secret-key-for-jwt-minimum-32-characters-long'

// Global test setup
beforeEach(() => {
  jest.clearAllMocks()
})