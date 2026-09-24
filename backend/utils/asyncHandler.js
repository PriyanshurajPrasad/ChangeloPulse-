/**
 * Async handler middleware to wrap async controller methods
 * and forward caught errors to express error handling middleware.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
