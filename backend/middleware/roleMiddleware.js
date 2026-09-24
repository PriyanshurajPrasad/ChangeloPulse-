/**
 * Middleware for Role Based Access Control (RBAC)
 * @param {...string} roles - Array of allowed roles (e.g. 'admin', 'user')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. ${roles.join(' or ')} role required.`
      });
    }

    next();
  };
};

/**
 * Convenience helper for admin-only routes
 */
const requireAdmin = authorize('admin');

/**
 * Convenience helper for user-only routes
 */
const requireUser = authorize('user');

module.exports = {
  authorize,
  requireAdmin,
  requireUser
};

