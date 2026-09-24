const asyncHandler = require('../utils/asyncHandler');
const chatbotService = require('../services/chatbotService');

/**
 * @desc    Process chatbot message and return AI/website assistant response
 * @route   POST /api/chatbot/message
 * @access  Public / User
 */
const processMessage = asyncHandler(async (req, res) => {
  const { message, context } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid question or message'
    });
  }

  if (message.length > 500) {
    return res.status(400).json({
      success: false,
      message: 'Message is too long. Please keep your question under 500 characters.'
    });
  }

  const response = await chatbotService.processMessage(message, context || {}, req.user || null);

  res.status(200).json({
    success: true,
    data: {
      message: response.message,
      actions: response.actions || []
    }
  });
});

module.exports = {
  processMessage
};
