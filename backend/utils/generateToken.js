const jwt = require('jsonwebtoken');

/**
 * Generates JWT token and attaches HTTP-only cookie to response
 * @param {Object} res - Express response object
 * @param {string} userId - Mongoose User ObjectId
 * @param {string} role - User role ('admin' | 'user')
 * @returns {string} token - Signed JWT token string
 */
const generateToken = (res, userId, role) => {
  const token = jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    }
  );

  // Cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
  };

  if (res) {
    res.cookie('jwt', token, cookieOptions);
  }

  return token;
};

module.exports = generateToken;
