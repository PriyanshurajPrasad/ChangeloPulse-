const express = require('express');
const { body } = require('express-validator');
const {
  createOrUpdateFeedback,
  getMyFeedback,
  getFeedbackForUpdate,
  updateMyFeedback,
  deleteMyFeedback,
  getAllAdminFeedback,
  getAdminFeedbackById,
  updateFeedbackStatus,
  replyToFeedback,
  deleteAdminFeedback,
  getFeedbackStatistics
} = require('../controllers/feedbackController');

const { protect, optionalAuth } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/roleMiddleware');
const { validateRequest } = require('../middleware/validateMiddleware');

const router = express.Router();

// Validation Rules
const feedbackValidation = [
  body('updateId').notEmpty().withMessage('updateId is required'),
  body('rating')
    .isIn(['very-helpful', 'helpful', 'not-helpful'])
    .withMessage('Rating must be very-helpful, helpful, or not-helpful'),
  body('message')
    .trim()
    .isLength({ min: 5, max: 1000 })
    .withMessage('Feedback message must be between 5 and 1000 characters'),
  validateRequest
];

const replyValidation = [
  body('adminReply').trim().notEmpty().withMessage('Admin reply cannot be empty'),
  validateRequest
];

// Public / Optional Auth Routes
router.get('/update/:updateId', optionalAuth, getFeedbackForUpdate);

// Protected User Routes
router.post('/', protect, feedbackValidation, createOrUpdateFeedback);
router.get('/my', protect, getMyFeedback);
router.put('/:id', protect, updateMyFeedback);
router.delete('/:id', protect, deleteMyFeedback);

// Protected Admin Routes (Guarded by protect AND requireAdmin)
router.get('/admin', protect, requireAdmin, getAllAdminFeedback);
router.get('/admin/all', protect, requireAdmin, getAllAdminFeedback);
router.get('/admin/statistics', protect, requireAdmin, getFeedbackStatistics);
router.get('/admin/:id', protect, requireAdmin, getAdminFeedbackById);
router.patch('/admin/:id/status', protect, requireAdmin, updateFeedbackStatus);
router.patch('/admin/:id/reply', protect, requireAdmin, replyValidation, replyToFeedback);
router.delete('/admin/:id', protect, requireAdmin, deleteAdminFeedback);

module.exports = router;
