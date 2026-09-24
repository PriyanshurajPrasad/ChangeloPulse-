const express = require('express');
const { getWidgetUpdates } = require('../controllers/widgetController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Authenticated widget endpoint for embedded product updates
router.get('/updates', protect, getWidgetUpdates);

module.exports = router;
