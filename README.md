# 🏦 Digital Wallet Application

A secure and modern digital wallet platform built with cutting-edge web technologies. This project represents my journey into **fintech development** and demonstrates enterprise-grade security implementations in financial applications.

## 🎯 Project Purpose

As I'm expanding my expertise into the **financial technology sector**, I developed this digital wallet application to:
- Gain hands-on experience with fintech security standards
- Implement industry-best practices for financial data protection
- Learn about secure payment processing and transaction management
- Build a comprehensive understanding of digital wallet architecture

## 🚀 Tech Stack

- **Frontend:** React 19, Next.js 15, TypeScript, Tailwind CSS v4
- **Backend:** Next.js API Routes, Supabase
- **Animations:** Framer Motion for professional page transitions
- **Security:** Argon2 password hashing, JOSE JWT management, Edge-compatible Redis rate limiting
- **Database:** PostgreSQL (via Supabase)
- **Device Tracking:** FingerprintJS for enhanced security
- **Testing:** Jest 30.1.3 with ts-jest
- **Authentication:** Custom secure authentication system with JWT tokens and fingerprinting

## 🔐 Security Features

- **Enterprise-Grade Authentication** - Argon2 password hashing with device fingerprinting
- **JWT Token Management** - Secure session handling with JOSE library and refresh tokens
- **Edge-Compatible Rate Limiting** - Redis REST API based rate limiting with memory fallback
- **RBAC Middleware** - Role-based access control with automatic redirects
- **Security Headers & CORS** - Comprehensive security headers (CSP, HSTS, XSS Protection)
- **Input Validation & Sanitization** - Multi-layer validation with Zod and custom sanitizers
- **Secure Cookie Configuration** - HTTPOnly, Secure, SameSite policies
- **Bot Detection** - Honeypot fields and device fingerprint validation
- **User Agent Parsing** - Device and browser detection for security logs
- **Professional Error Handling** - Custom rate limit pages with countdown timers

## 📋 Current Features

### Authentication & Security
- ✅ User registration and authentication with Argon2 password hashing
- ✅ Secure login with JWT tokens (3h access, 7d refresh)
- ✅ Rate limiting (5 requests per 5 minutes) with Redis backend
- ✅ Bot detection using honeypot fields
- ✅ User session management with device fingerprinting
- ✅ Automatic wallet creation for new users

### User Interface
- ✅ Dark/Light theme toggle with localStorage persistence
- ✅ Responsive admin dashboard with sidebar navigation
- ✅ Theme-aware components and conditional styling
- ✅ Admin and user dashboards with role-based routing

### Backend Infrastructure
- ✅ JWT token generation with user ID embedding
- ✅ Redis-based rate limiter with fail-safe security
- ✅ User agent parsing for device information
- ✅ Comprehensive error handling and logging

### Testing & Quality Assurance
- ✅ Jest test suite for utilities (tokenGenerator, rateLimiter)
- ✅ TypeScript configuration with strict mode
- ✅ ESLint configuration for code quality
- ✅ Next.js 15 with Turbopack support

## 🧪 Testing

The project includes comprehensive test coverage for critical utilities:

```bash
# Run all tests
npm test

# Run specific test suites
npm test tokenGenerator
npm test rateLimiter

# Run tests with coverage
npm run test:coverage
```

### Test Coverage
- **JWT Token Generator**: Token creation, expiration handling, error scenarios
- **Rate Limiter**: Request limiting, Redis integration, fail-safe behavior
- **Mock implementations**: Proper mocking for external dependencies

## 🔧 Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/MelihIlker/digital-wallet.git
   cd digital-wallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   # Create .env.local file with:
   JWT_SECRET_KEY=your-secret-key-minimum-32-characters
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   REDIS_URL=your-redis-url
   FRONTEND_URL=http://localhost:3000
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Run tests**
   ```bash
   npm test
   ```

## 🚧 In Development

- 💰 Balance management and transactions
- 📊 Transaction history and analytics
- 🔔 Real-time notifications
- 📱 QR code payments
- 🛡️ Advanced fraud detection
- 🔐 JWT verification middleware
- 🛡️ API endpoint authorization system

## 🏗️ Architecture Decisions

### Security Architecture
- **JWT Structure**: Standard claims (iss, aud, sub) with minimal user data for edge compatibility
- **Rate Limiting**: Sliding window algorithm with Redis REST API for edge runtime support
- **Password Security**: Argon2 with proper salt and iteration configuration
- **Session Management**: Refresh token rotation with device fingerprinting
- **RBAC Middleware**: Role-based access control with automatic redirects
- **Edge Security**: Optimized for serverless edge deployment with fallback mechanisms

### Frontend Architecture
- **Theme System**: Context-based theme management with localStorage persistence
- **Component Structure**: Reusable UI components with TypeScript interfaces and framer-motion animations
- **Routing**: Next.js App Router with role-based access control and professional error pages
- **Animation System**: Framer Motion for enhanced user experience with staggered effects

### Backend Architecture
- **API Routes**: RESTful design with proper HTTP status codes and security headers
- **Error Handling**: Consistent error responses with security considerations and professional UI
- **Database Design**: Normalized schema with proper relationships and JSDoc documentation
- **Edge Compatibility**: Redis REST API integration for global edge deployment

## 💡 Learning Goals

Through this project, I'm developing expertise in:
- **Enterprise Security Standards** - JWT, RBAC, rate limiting, security headers
- **Edge Runtime Optimization** - Redis REST API, edge-compatible middleware
- **Payment Processing Workflows** - Secure transaction handling
- **Real-time Systems** - WebSocket integration, live data updates
- **Regulatory Compliance** - Data protection and financial regulations
- **Professional UX Design** - Error handling, loading states, animations
- **Scalable Architecture** - Microservices, serverless, edge deployment
- **Modern Testing** - Jest test suites, coverage reports, mocking strategies
- **Advanced TypeScript** - Strict configurations, complex type definitions
- **DevOps Integration** - CI/CD pipelines, environment management

## 🔍 Key Implementation Details

### JWT Token System
- **Access Tokens**: 3-hour expiration with user ID embedding
- **Refresh Tokens**: 7-day expiration stored in database
- **Security**: HS256 algorithm with issuer/audience validation

### Rate Limiting Strategy
- **Algorithm**: Sliding window with Redis backend
- **Fail-Safe**: Denies requests when Redis is unavailable
- **Granularity**: IP-based tracking with configurable limits

### Theme Implementation
- **Persistence**: localStorage with document class manipulation
- **SSR Compatibility**: Proper hydration handling
- **Performance**: Optimized re-renders with React Context

## 🎓 About This Project

This is a learning project designed to showcase my growing expertise in fintech development. While I'm relatively new to the financial technology domain, I'm committed to implementing industry-standard security practices and building production-quality code.

The codebase demonstrates:
- Modern React/Next.js development patterns
- Comprehensive testing strategies
- Security-first development approach
- Professional code organization and documentation

---

**Note:** This application is for educational and portfolio purposes. It demonstrates secure coding practices and modern web development techniques in the context of financial applications.