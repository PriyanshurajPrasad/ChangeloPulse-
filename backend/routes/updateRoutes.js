const express = require('express');
const { body } = require('express-validator');
const {
  createUpdate,
  getUpdates,
  getUpdateById,
  updateUpdate,
  deleteUpdate,
  publishUpdate,
  archiveUpdate,
  getUpdateStats
} = require('../controllers/updateController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/roleMiddleware');
const { validateRequest, validateObjectId } = require('../middleware/validateMiddleware');

const router = express.Router();

const createUpdateValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('category')
    .isIn(['feature', 'improvement', 'bug-fix', 'announcement', 'release'])
    .withMessage('Category must be feature, improvement, bug-fix, announcement, or release'),
  body('version').trim().notEmpty().withMessage('Version is required'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Status must be draft, published, or archived'),
  validateRequest
];

const updateUpdateValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('content').optional().trim().notEmpty().withMessage('Content cannot be empty'),
  body('category')
    .optional()
    .isIn(['feature', 'improvement', 'bug-fix', 'announcement', 'release'])
    .withMessage('Category must be feature, improvement, bug-fix, announcement, or release'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Status must be draft, published, or archived'),
  validateRequest
];

// Authenticated Users Routes
router.get('/', protect, getUpdates);
router.get('/stats', protect, requireAdmin, getUpdateStats);
router.get('/:id', protect, getUpdateById);

// Admin Only Routes
router.post('/', protect, requireAdmin, createUpdateValidation, createUpdate);
router.put('/:id', protect, requireAdmin, validateObjectId('id'), updateUpdateValidation, updateUpdate);
router.delete('/:id', protect, requireAdmin, validateObjectId('id'), deleteUpdate);
router.patch('/:id/publish', protect, requireAdmin, validateObjectId('id'), publishUpdate);
router.patch('/:id/archive', protect, requireAdmin, validateObjectId('id'), archiveUpdate);

module.exports = router;
