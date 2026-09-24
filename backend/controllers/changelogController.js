const asyncHandler = require('../utils/asyncHandler');
const Update = require('../models/Update');

/**
 * @desc    Get public changelog updates (ONLY published)
 * @route   GET /api/changelog
 * @access  Public
 */
const getPublicChangelog = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const skip = (page - 1) * limit;

  const { search, category, sort } = req.query;

  // Strict public filter: ONLY published updates
  const query = { status: 'published' };

  if (category) {
    query.category = category;
  }

  if (search) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { content: searchRegex },
      { tags: searchRegex },
      { version: searchRegex }
    ];
  }

  let sortOption = { publishedAt: -1 };
  if (sort === 'oldest') {
    sortOption = { publishedAt: 1 };
  }

  const total = await Update.countDocuments(query);
  const updates = await Update.find(query)
    .populate('author', 'name avatar')
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: updates,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1
    }
  });
});

module.exports = {
  getPublicChangelog
};
