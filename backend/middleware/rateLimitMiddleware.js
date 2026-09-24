/**
 * Anti-brute-force Rate Limiting Middleware for Admin Access Code Verification
 * Limits repeated failed authentication attempts per IP address.
 */

const attempts = new Map();

// Periodic cleanup of expired rate limit entries (every 10 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of attempts.entries()) {
    if (now > data.resetTime) {
      attempts.delete(ip);
    }
  }
}, 10 * 60 * 1000);

const adminAccessRateLimiter = (options = {}) => {
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes window
  const maxAttempts = options.maxAttempts || 5; // Max 5 failed attempts per window

  return (req, res, next) => {
    const ip =
      req.ip ||
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket?.remoteAddress ||
      'unknown-ip';
    
    const now = Date.now();

    let record = attempts.get(ip);
    if (!record || now > record.resetTime) {
      record = { failedAttempts: 0, resetTime: now + windowMs };
    }

    if (record.failedAttempts >= maxAttempts) {
      return res.status(429).json({
        success: false,
        message: 'Too many attempts. Please try again later.'
      });
    }

    // Attach helper methods to req so controller can log failure or reset on success
    req.rateLimit = {
      recordFailure: () => {
        record.failedAttempts += 1;
        record.resetTime = Date.now() + windowMs;
        attempts.set(ip, record);
      },
      recordSuccess: () => {
        attempts.delete(ip);
      }
    };

    next();
  };
};

module.exports = { adminAccessRateLimiter };
