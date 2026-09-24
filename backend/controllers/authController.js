const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user with given email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'User with this email already exists'
    });
  }

  // Public registration MUST ALWAYS create standard users with role = 'user'
  // Ignore any attempt to pass role in request body
  const user = await User.create({
    name,
    email,
    password,
    role: 'user'
  });

  if (user) {
    // Generate token and set HTTP-only cookie
    const token = generateToken(res, user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isActive: user.isActive,
        createdAt: user.createdAt
      },
      token
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid user data received'
    });
  }
});

/**
 * @desc    Authenticate standard user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email and explicitly select password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    if (req.rateLimit) req.rateLimit.recordFailure();
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  if (!user.isActive) {
    if (req.rateLimit) req.rateLimit.recordFailure();
    return res.status(403).json({
      success: false,
      message: 'Your account has been deactivated. Please contact support.'
    });
  }

  // Rule 3: Admin accounts MUST NOT use normal email/password login
  if (user.role === 'admin') {
    if (req.rateLimit) req.rateLimit.recordFailure();
    return res.status(401).json({
      success: false,
      message: 'Admin accounts must sign in via the Administrator Portal at /admin/login.'
    });
  }

  // Check password match
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    if (req.rateLimit) req.rateLimit.recordFailure();
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  if (req.rateLimit) req.rateLimit.recordSuccess();

  // Generate JWT token & cookie
  const token = generateToken(res, user._id, user.role);

  res.status(200).json({
    success: true,
    message: 'Logged in successfully',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isActive: user.isActive,
      createdAt: user.createdAt
    },
    token
  });
});

/**
 * @desc    Authenticate Administrator using Email and Password
 * @route   POST /api/auth/admin/login
 * @access  Public
 */
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password, code } = req.body;

  // Support legacy 4-char access code if provided directly
  if (code && typeof code === 'string' && code.trim().length === 4) {
    return adminAccess(req, res);
  }

  if (!email || !password) {
    if (req.rateLimit) req.rateLimit.recordFailure();
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  // Find user by email
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    if (req.rateLimit) req.rateLimit.recordFailure();
    return res.status(401).json({
      success: false,
      message: 'Invalid administrator credentials'
    });
  }

  if (!user.isActive) {
    if (req.rateLimit) req.rateLimit.recordFailure();
    return res.status(403).json({
      success: false,
      message: 'Your administrator account has been deactivated.'
    });
  }

  // Cross-portal protection: If user is a standard user, block entry
  if (user.role === 'user') {
    if (req.rateLimit) req.rateLimit.recordFailure();
    return res.status(403).json({
      success: false,
      message: 'Access denied. This account does not have administrator permissions.'
    });
  }

  // Check password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    if (req.rateLimit) req.rateLimit.recordFailure();
    return res.status(401).json({
      success: false,
      message: 'Invalid administrator credentials'
    });
  }

  if (req.rateLimit) req.rateLimit.recordSuccess();

  // Generate token & set cookie
  const token = generateToken(res, user._id, user.role);

  res.status(200).json({
    success: true,
    message: 'Admin authenticated successfully',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isActive: user.isActive,
      createdAt: user.createdAt
    },
    token
  });
});

/**
 * @desc    Register a new Administrator using Secure Invitation Code
 * @route   POST /api/auth/admin/register
 * @access  Protected by server-side invite code
 */
const adminRegister = asyncHandler(async (req, res) => {
  const { name, email, password, inviteCode } = req.body;

  const validInviteCode = (process.env.ADMIN_INVITE_CODE || process.env.ADMIN_ACCESS_CODE || 'A7K2').trim().toUpperCase();

  // Validate server-side authorization code
  if (!inviteCode || typeof inviteCode !== 'string' || inviteCode.trim().toUpperCase() !== validInviteCode) {
    return res.status(403).json({
      success: false,
      message: 'Invalid administrator invitation code. Authorized access required.'
    });
  }

  // Check existing email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'User with this email already exists'
    });
  }

  // Server assigns role = 'admin' strictly
  const adminUser = await User.create({
    name,
    email,
    password,
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  const token = generateToken(res, adminUser._id, adminUser.role);

  res.status(201).json({
    success: true,
    message: 'Administrator account registered successfully',
    data: {
      _id: adminUser._id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
      avatar: adminUser.avatar,
      isActive: adminUser.isActive,
      createdAt: adminUser.createdAt
    },
    token
  });
});

/**
 * @desc    Authenticate Administrator using Secret 4-Character Access Code
 * @route   POST /api/auth/admin-access
 * @access  Public (Rate Limited)
 */
const adminAccess = asyncHandler(async (req, res) => {
  const { code } = req.body;

  if (!code || typeof code !== 'string') {
    if (req.rateLimit) req.rateLimit.recordFailure();
    return res.status(400).json({
      success: false,
      message: 'Invalid access code.'
    });
  }

  const normalizedCode = code.trim().toUpperCase();

  // Validate format: exactly 4 alphanumeric characters
  const codeRegex = /^[A-Za-z0-9]{4}$/;
  if (!codeRegex.test(normalizedCode)) {
    if (req.rateLimit) req.rateLimit.recordFailure();
    return res.status(400).json({
      success: false,
      message: 'Invalid access code.'
    });
  }

  // Find system admin user in database
  let adminUser = await User.findOne({ role: 'admin', isActive: true }).select('+adminAccessCodeHash');

  const serverCode = (process.env.ADMIN_ACCESS_CODE || 'A7K2').trim().toUpperCase();

  if (!adminUser) {
    // If no admin user exists in database, auto-create systemic admin user with hashed code
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(serverCode, salt);

    adminUser = await User.create({
      name: 'System Administrator',
      email: 'admin@changelogpulse.com',
      password: 'AdminSecurePassword@123',
      role: 'admin',
      adminAccessCodeHash: hash,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    });
  }

  // Compare submitted code with stored bcrypt hash AND fallback to server env code
  let isMatch = false;

  if (adminUser.adminAccessCodeHash) {
    isMatch = await bcrypt.compare(normalizedCode, adminUser.adminAccessCodeHash);
  }

  if (!isMatch) {
    isMatch = (normalizedCode === serverCode);
    if (isMatch) {
      // Re-hash and update database
      const salt = await bcrypt.genSalt(10);
      adminUser.adminAccessCodeHash = await bcrypt.hash(normalizedCode, salt);
      await adminUser.save();
    }
  }

  if (!isMatch) {
    if (req.rateLimit) req.rateLimit.recordFailure();
    return res.status(400).json({
      success: false,
      message: 'Invalid access code.'
    });
  }

  // Clear rate limit failed count on successful verification
  if (req.rateLimit) req.rateLimit.recordSuccess();

  // Generate JWT token & set HTTP-only cookie for Admin identity
  const token = generateToken(res, adminUser._id, adminUser.role);

  res.status(200).json({
    success: true,
    message: 'Admin authenticated successfully',
    data: {
      _id: adminUser._id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
      avatar: adminUser.avatar,
      isActive: adminUser.isActive,
      createdAt: adminUser.createdAt
    },
    token
  });
});

/**
 * @desc    Disabled/Removed public admin registration endpoint
 * @route   POST /api/auth/register-admin
 * @access  Disabled
 */
const registerAdmin = asyncHandler(async (req, res) => {
  res.status(403).json({
    success: false,
    message: 'Public admin registration is disabled. Administrators must use the invitation code or access code.'
  });
});

/**
 * @desc    Logout user & clear cookie
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

/**
 * @desc    Get current user profile (returns null cleanly if not authenticated)
 * @route   GET /api/auth/me
 * @access  Public (Optional Auth)
 */
const getMe = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(200).json({
      success: false,
      data: null,
      message: 'Not authenticated'
    });
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(200).json({
      success: false,
      data: null,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

module.exports = {
  registerUser,
  loginUser,
  adminLogin,
  adminRegister,
  adminAccess,
  registerAdmin,
  logoutUser,
  getMe
};
