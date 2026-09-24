const express = require('express');
const { body } = require('express-validator');
const {
  registerUser,
  loginUser,
  adminLogin,
  adminRegister,
  adminAccess,
  registerAdmin,
  logoutUser,
  getMe
} = require('../controllers/authController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateMiddleware');
const { adminAccessRateLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

// Validation Rules
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  validateRequest
];

const loginValidation = [
  body('email').trim().isEmail().withMessage('Please provide a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
];

const adminRegisterValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('inviteCode')
    .trim()
    .notEmpty()
    .withMessage('Administrator Invitation Code is required'),
  validateRequest
];

const adminAccessValidation = [
  body('code')
    .trim()
    .notEmpty()
    .withMessage('Admin Access Code is required')
    .isLength({ min: 4, max: 4 })
    .withMessage('Access code must be exactly 4 characters')
    .matches(/^[A-Za-z0-9]{4}$/)
    .withMessage('Access code must contain only alphanumeric characters'),
  validateRequest
];

// Routes
router.post('/register', registerValidation, registerUser);
router.post('/login', adminAccessRateLimiter({ maxAttempts: 10 }), loginValidation, loginUser);
router.post('/admin/login', adminAccessRateLimiter({ maxAttempts: 10 }), adminLogin);
router.post('/admin/register', adminRegisterValidation, adminRegister);
router.post('/admin-access', adminAccessRateLimiter({ maxAttempts: 5 }), adminAccessValidation, adminAccess);
router.post('/register-admin', registerAdmin);
router.post('/logout', protect, logoutUser);
router.get('/me', optionalAuth, getMe);

module.exports = router;
