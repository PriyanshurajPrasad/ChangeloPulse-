const asyncHandler = require('../utils/asyncHandler');
const Update = require('../models/Update');

/**
 * @desc    Get lightweight product updates specifically tailored for a embeddable frontend widget
 * @route   GET /api/widget/updates
 * @access  Public
 */
const getWidgetUpdates = asyncHandler(async (req, res) => {
  const limit = Math.min(20, Math.max(1, parseInt(req.query.limit, 10) || 5));

  // Query ONLY published updates, select minimal fields
  const updates = await Update.find({ status: 'published' })
    .select('title slug description category version publishedAt coverImage')
    .sort({ publishedAt: -1 })
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    count: updates.length,
    data: updates
  });
});

module.exports = {
  getWidgetUpdates
};
