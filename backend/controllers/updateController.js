const asyncHandler = require('../utils/asyncHandler');
const Update = require('../models/Update');
const { generateUniqueSlug } = require('../utils/slugify');
const { emitSocketEvent } = require('../utils/socket');
const mongoose = require('mongoose');

/**
 * @desc    Create a new product update
 * @route   POST /api/updates
 * @access  Private/Admin
 */
const createUpdate = asyncHandler(async (req, res) => {
  const { title, description, content, category, version, status, coverImage, tags } = req.body;

  // Generate unique slug from title
  const slug = await generateUniqueSlug(Update, title);

  // Set publication timestamp if status is published
  const isPublished = status === 'published';
  const publishedAt = isPublished ? Date.now() : null;

  const update = await Update.create({
    title,
    slug,
    description,
    content,
    category,
    version,
    status: status || 'draft',
    coverImage: coverImage || '',
    tags: Array.isArray(tags) ? tags : tags ? tags.split(',').map((t) => t.trim()) : [],
    author: req.user._id,
    publishedAt
  });

  const populatedUpdate = await Update.findById(update._id).populate(
    'author',
    'name email avatar role'
  );

  emitSocketEvent('updateCreated', populatedUpdate);
  if (populatedUpdate.status === 'published') {
    emitSocketEvent('updatePublished', populatedUpdate);
  }

  res.status(201).json({
    success: true,
    message: 'Product update created successfully',
    data: populatedUpdate
  });
});

/**
 * @desc    Get all updates with pagination, filtering, search & sorting
 * @route   GET /api/updates
 * @access  Public / Private (Admin sees drafts/archived)
 */
const getUpdates = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const skip = (page - 1) * limit;

  const { search, category, status, version, sort } = req.query;

  // Build Filter Query
  const query = {};

  // Access check: Normal users only see published updates
  const isAdmin = req.user && req.user.role === 'admin';
  if (!isAdmin) {
    query.status = 'published';
  } else if (status) {
    // Admin filtering by status
    query.status = status;
  }

  // Category filter
  if (category) {
    query.category = category;
  }

  // Version filter
  if (version) {
    query.version = version;
  }

  // Search filter (text index or regex search across title, description, content, tags)
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

  // Sorting
  let sortOption = { publishedAt: -1, createdAt: -1 };
  if (sort === 'oldest') {
    sortOption = { publishedAt: 1, createdAt: 1 };
  } else if (sort === 'newest') {
    sortOption = { publishedAt: -1, createdAt: -1 };
  }

  const total = await Update.countDocuments(query);
  const updates = await Update.find(query)
    .populate('author', 'name email avatar role')
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

/**
 * @desc    Get single update by ID or Slug
 * @route   GET /api/updates/:id
 * @access  Public / Private
 */
const getUpdateById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isObjectId = mongoose.Types.ObjectId.isValid(id);

  const query = isObjectId ? { _id: id } : { slug: id };

  const update = await Update.findOne(query).populate(
    'author',
    'name email avatar role'
  );

  if (!update) {
    return res.status(404).json({
      success: false,
      message: 'Product update not found'
    });
  }

  // Access control: If draft/archived, require Admin
  const isAdmin = req.user && req.user.role === 'admin';
  if (update.status !== 'published' && !isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Access denied: This update is not published'
    });
  }

  res.status(200).json({
    success: true,
    data: update
  });
});

/**
 * @desc    Update a product update
 * @route   PUT /api/updates/:id
 * @access  Private/Admin
 */
const updateUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, content, category, version, status, coverImage, tags } = req.body;

  let update = await Update.findById(id);

  if (!update) {
    return res.status(404).json({
      success: false,
      message: 'Product update not found'
    });
  }

  // If title is changing, update the slug safely
  if (title && title !== update.title) {
    update.slug = await generateUniqueSlug(Update, title, id);
    update.title = title;
  }

  if (description) update.description = description;
  if (content) update.content = content;
  if (category) update.category = category;
  if (version) update.version = version;
  if (coverImage !== undefined) update.coverImage = coverImage;

  if (tags !== undefined) {
    update.tags = Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim());
  }

  // Handle status update
  if (status && status !== update.status) {
    update.status = status;
    if (status === 'published' && !update.publishedAt) {
      update.publishedAt = Date.now();
    }
  }

  const updatedDoc = await update.save();
  const populated = await Update.findById(updatedDoc._id).populate(
    'author',
    'name email avatar role'
  );

  emitSocketEvent('updateUpdated', populated);
  if (populated.status === 'published') {
    emitSocketEvent('updatePublished', populated);
  } else if (populated.status === 'archived') {
    emitSocketEvent('updateArchived', populated);
  }

  res.status(200).json({
    success: true,
    message: 'Product update updated successfully',
    data: populated
  });
});

/**
 * @desc    Delete a product update
 * @route   DELETE /api/updates/:id
 * @access  Private/Admin
 */
const deleteUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const update = await Update.findById(id);

  if (!update) {
    return res.status(404).json({
      success: false,
      message: 'Product update not found'
    });
  }

  await update.deleteOne();

  emitSocketEvent('updateDeleted', { id, slug: update.slug });

  res.status(200).json({
    success: true,
    message: 'Product update deleted successfully'
  });
});

/**
 * @desc    Publish a product update
 * @route   PATCH /api/updates/:id/publish
 * @access  Private/Admin
 */
const publishUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const update = await Update.findById(id);

  if (!update) {
    return res.status(404).json({
      success: false,
      message: 'Product update not found'
    });
  }

  update.status = 'published';
  update.publishedAt = Date.now();

  const publishedDoc = await update.save();
  const populated = await Update.findById(publishedDoc._id).populate(
    'author',
    'name email avatar role'
  );

  emitSocketEvent('updatePublished', populated);

  res.status(200).json({
    success: true,
    message: 'Product update published successfully',
    data: populated
  });
});

/**
 * @desc    Archive a product update
 * @route   PATCH /api/updates/:id/archive
 * @access  Private/Admin
 */
const archiveUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const update = await Update.findById(id);

  if (!update) {
    return res.status(404).json({
      success: false,
      message: 'Product update not found'
    });
  }

  update.status = 'archived';

  const archivedDoc = await update.save();
  const populated = await Update.findById(archivedDoc._id).populate(
    'author',
    'name email avatar role'
  );

  emitSocketEvent('updateArchived', populated);

  res.status(200).json({
    success: true,
    message: 'Product update archived successfully',
    data: populated
  });
});

/**
 * @desc    Get product update aggregated statistics for Admin Dashboard
 * @route   GET /api/updates/stats
 * @access  Private/Admin
 */
const getUpdateStats = asyncHandler(async (req, res) => {
  const Feedback = require('../models/Feedback');
  const User = require('../models/User');

  const total = await Update.countDocuments();
  const published = await Update.countDocuments({ status: 'published' });
  const drafts = await Update.countDocuments({ status: 'draft' });
  const archived = await Update.countDocuments({ status: 'archived' });

  const totalUsers = await User.countDocuments({ role: 'user' });

  const totalFeedback = await Feedback.countDocuments();
  const newFeedback = await Feedback.countDocuments({ status: 'new' });
  const reviewedFeedback = await Feedback.countDocuments({ status: 'reviewed' });
  const resolvedFeedback = await Feedback.countDocuments({ status: 'resolved' });

  const categoryAggregation = await Update.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);

  const categoryCounts = {
    feature: 0,
    improvement: 0,
    'bug-fix': 0,
    announcement: 0,
    release: 0
  };

  categoryAggregation.forEach((item) => {
    if (item._id && categoryCounts.hasOwnProperty(item._id)) {
      categoryCounts[item._id] = item.count;
    }
  });

  res.status(200).json({
    success: true,
    data: {
      total,
      published,
      drafts,
      archived,
      totalUsers,
      totalFeedback,
      newFeedback,
      reviewedFeedback,
      resolvedFeedback,
      categoryCounts
    }
  });
});

module.exports = {
  createUpdate,
  getUpdates,
  getUpdateById,
  updateUpdate,
  deleteUpdate,
  publishUpdate,
  archiveUpdate,
  getUpdateStats
};

