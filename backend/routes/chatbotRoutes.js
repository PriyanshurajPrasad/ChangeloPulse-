const express = require('express');
const { body } = require('express-validator');
const { processMessage } = require('../controllers/chatbotController');
const { protect } = require('../middleware/authMiddleware');
const { requireUser } = require('../middleware/roleMiddleware');
const { validateRequest } = require('../middleware/validateMiddleware');

const router = express.Router();

const messageValidation = [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 500 })
    .withMessage('Message cannot exceed 500 characters'),
  validateRequest
];

// Product Assistant chatbot is available ONLY for authenticated standard users
router.post('/message', protect, requireUser, messageValidation, processMessage);

module.exports = router;
