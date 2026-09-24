const express = require('express');
const { getPublicChangelog } = require('../controllers/changelogController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Authenticated users ONLY (published updates feed)
router.get('/', protect, getPublicChangelog);

module.exports = router;

