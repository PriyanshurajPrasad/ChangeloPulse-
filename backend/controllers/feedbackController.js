const asyncHandler = require('../utils/asyncHandler');
const Feedback = require('../models/Feedback');
const Update = require('../models/Update');
const { emitSocketEvent } = require('../utils/socket');
const mongoose = require('mongoose');

/**
 * @desc    Submit or update user feedback for a product update
 * @route   POST /api/feedback
 * @access  Private (User)
 */
const createOrUpdateFeedback = asyncHandler(async (req, res) => {
  const { updateId, rating, message } = req.body;
  const userId = req.user._id;

  if (!updateId || !mongoose.Types.ObjectId.isValid(updateId)) {
    return res.status(400).json({
      success: false,
      message: 'Valid updateId is required'
    });
  }

  // Check if update exists and is published
  const targetUpdate = await Update.findById(updateId);
  if (!targetUpdate) {
    return res.status(404).json({
      success: false,
      message: 'Product update not found'
    });
  }

  if (targetUpdate.status !== 'published') {
    return res.status(400).json({
      success: false,
      message: 'Feedback can only be submitted for published updates'
    });
  }

  // Find existing feedback or create new
  let feedback = await Feedback.findOne({ user: userId, update: updateId });
  let isNew = false;

  if (feedback) {
    feedback.rating = rating;
    feedback.message = message;
    feedback.status = 'new'; // Reset to new on update so admin can re-review if needed
    await feedback.save();
  } else {
    isNew = true;
    feedback = await Feedback.create({
      user: userId,
      update: updateId,
      rating,
      message,
      status: 'new'
    });
  }

  // Populate user and update details for response & real-time notification
  const populatedFeedback = await Feedback.findById(feedback._id)
    .populate('user', 'name email avatar role')
    .populate('update', 'title version slug category');

  // Broadcast real-time socket event
  emitSocketEvent(isNew ? 'feedbackCreated' : 'feedbackUpdated', populatedFeedback);

  res.status(isNew ? 201 : 200).json({
    success: true,
    message: isNew ? 'Feedback submitted successfully' : 'Feedback updated successfully',
    data: populatedFeedback
  });
});

/**
 * @desc    Get all feedback submitted by the logged-in user
 * @route   GET /api/feedback/my
 * @access  Private (User)
 */
const getMyFeedback = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const feedbacks = await Feedback.find({ user: userId })
    .populate('update', 'title version slug category coverImage publishedAt')
    .sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    count: feedbacks.length,
    data: feedbacks
  });
});

/**
 * @desc    Get feedback summary and stats for a specific update
 * @route   GET /api/feedback/update/:updateId
 * @access  Public / Optional Auth
 */
const getFeedbackForUpdate = asyncHandler(async (req, res) => {
  const { updateId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(updateId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid update ID'
    });
  }

  const feedbacks = await Feedback.find({ update: updateId });
  const totalCount = feedbacks.length;

  const veryHelpfulCount = feedbacks.filter((f) => f.rating === 'very-helpful').length;
  const helpfulCount = feedbacks.filter((f) => f.rating === 'helpful').length;
  const notHelpfulCount = feedbacks.filter((f) => f.rating === 'not-helpful').length;

  const positiveCount = veryHelpfulCount + helpfulCount;
  const helpfulnessPercent = totalCount > 0 ? Math.round((positiveCount / totalCount) * 100) : 0;

  // Check if current user has already submitted feedback
  let userFeedback = null;
  if (req.user) {
    userFeedback = await Feedback.findOne({ user: req.user._id, update: updateId });
  }

  res.status(200).json({
    success: true,
    data: {
      totalCount,
      veryHelpfulCount,
      helpfulCount,
      notHelpfulCount,
      helpfulnessPercent,
      userFeedback
    }
  });
});

/**
 * @desc    Update user's own feedback
 * @route   PUT /api/feedback/:id
 * @access  Private (User)
 */
const updateMyFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, message } = req.body;

  const feedback = await Feedback.findById(id);
  if (!feedback) {
    return res.status(404).json({
      success: false,
      message: 'Feedback not found'
    });
  }

  // Ensure user owns this feedback
  if (!feedback.user.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to modify this feedback'
    });
  }

  if (rating) feedback.rating = rating;
  if (message) feedback.message = message;
  feedback.status = 'new';

  await feedback.save();

  const populated = await Feedback.findById(feedback._id)
    .populate('user', 'name email avatar')
    .populate('update', 'title version slug');

  emitSocketEvent('feedbackUpdated', populated);

  res.status(200).json({
    success: true,
    message: 'Feedback updated successfully',
    data: populated
  });
});

/**
 * @desc    Delete user's own feedback
 * @route   DELETE /api/feedback/:id
 * @access  Private (User)
 */
const deleteMyFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const feedback = await Feedback.findById(id);
  if (!feedback) {
    return res.status(404).json({
      success: false,
      message: 'Feedback not found'
    });
  }

  if (!feedback.user.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this feedback'
    });
  }

  await feedback.deleteOne();
  emitSocketEvent('feedbackDeleted', { id, updateId: feedback.update });

  res.status(200).json({
    success: true,
    message: 'Feedback deleted successfully'
  });
});

// ==========================================
// ADMIN FEEDBACK MANAGEMENT CONTROLLERS
// ==========================================

/**
 * @desc    Get all feedback with filtering, searching, and pagination for Admin
 * @route   GET /api/feedback/admin/all
 * @access  Private (Admin)
 */
const getAllAdminFeedback = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const { status, rating, updateId, search } = req.query;

  const filter = {};

  if (status && status !== 'all') {
    filter.status = status;
  }

  if (rating && rating !== 'all') {
    filter.rating = rating;
  }

  if (updateId && mongoose.Types.ObjectId.isValid(updateId)) {
    filter.update = updateId;
  }

  let feedbacks = await Feedback.find(filter)
    .populate('user', 'name email avatar role')
    .populate('update', 'title version slug category')
    .populate('reviewedBy', 'name email')
    .sort({ createdAt: -1 });

  // Optional string search filter (user name, user email, update title, or message)
  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    feedbacks = feedbacks.filter(
      (f) =>
        (f.user?.name && f.user.name.toLowerCase().includes(q)) ||
        (f.user?.email && f.user.email.toLowerCase().includes(q)) ||
        (f.update?.title && f.update.title.toLowerCase().includes(q)) ||
        (f.message && f.message.toLowerCase().includes(q))
    );
  }

  const total = feedbacks.length;
  const paginatedFeedbacks = feedbacks.slice(skip, skip + limit);

  // Status counters for tab badges
  const totalAll = await Feedback.countDocuments({});
  const newCount = await Feedback.countDocuments({ status: 'new' });
  const reviewedCount = await Feedback.countDocuments({ status: 'reviewed' });
  const resolvedCount = await Feedback.countDocuments({ status: 'resolved' });
  const archivedCount = await Feedback.countDocuments({ status: 'archived' });

  res.status(200).json({
    success: true,
    data: paginatedFeedbacks,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      limit
    },
    counts: {
      all: totalAll,
      new: newCount,
      reviewed: reviewedCount,
      resolved: resolvedCount,
      archived: archivedCount
    }
  });
});

/**
 * @desc    Get single feedback details for Admin
 * @route   GET /api/feedback/admin/:id
 * @access  Private (Admin)
 */
const getAdminFeedbackById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const feedback = await Feedback.findById(id)
    .populate('user', 'name email avatar role createdAt')
    .populate('update', 'title version slug category coverImage publishedAt')
    .populate('reviewedBy', 'name email');

  if (!feedback) {
    return res.status(404).json({
      success: false,
      message: 'Feedback record not found'
    });
  }

  res.status(200).json({
    success: true,
    data: feedback
  });
});

/**
 * @desc    Update feedback status by Admin
 * @route   PATCH /api/feedback/admin/:id/status
 * @access  Private (Admin)
 */
const updateFeedbackStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['new', 'reviewed', 'resolved', 'archived'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status. Must be new, reviewed, resolved, or archived'
    });
  }

  const feedback = await Feedback.findById(id);
  if (!feedback) {
    return res.status(404).json({
      success: false,
      message: 'Feedback record not found'
    });
  }

  feedback.status = status;
  feedback.reviewedBy = req.user._id;
  feedback.reviewedAt = new Date();

  await feedback.save();

  const populated = await Feedback.findById(feedback._id)
    .populate('user', 'name email avatar')
    .populate('update', 'title version slug');

  emitSocketEvent('feedbackStatusChanged', populated);

  res.status(200).json({
    success: true,
    message: `Feedback status updated to ${status}`,
    data: populated
  });
});

/**
 * @desc    Admin reply to feedback
 * @route   PATCH /api/feedback/admin/:id/reply
 * @access  Private (Admin)
 */
const replyToFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { adminReply, status } = req.body;

  if (!adminReply || adminReply.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Admin reply text cannot be empty'
    });
  }

  const feedback = await Feedback.findById(id);
  if (!feedback) {
    return res.status(404).json({
      success: false,
      message: 'Feedback record not found'
    });
  }

  feedback.adminReply = adminReply.trim();
  feedback.status = status && ['reviewed', 'resolved'].includes(status) ? status : 'reviewed';
  feedback.reviewedBy = req.user._id;
  feedback.reviewedAt = new Date();

  await feedback.save();

  const populated = await Feedback.findById(feedback._id)
    .populate('user', 'name email avatar')
    .populate('update', 'title version slug');

  emitSocketEvent('feedbackReplied', populated);

  res.status(200).json({
    success: true,
    message: 'Admin reply submitted successfully',
    data: populated
  });
});

/**
 * @desc    Delete feedback by Admin
 * @route   DELETE /api/feedback/admin/:id
 * @access  Private (Admin)
 */
const deleteAdminFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const feedback = await Feedback.findById(id);
  if (!feedback) {
    return res.status(404).json({
      success: false,
      message: 'Feedback record not found'
    });
  }

  await feedback.deleteOne();
  emitSocketEvent('feedbackDeleted', { id, updateId: feedback.update });

  res.status(200).json({
    success: true,
    message: 'Feedback deleted successfully by administrator'
  });
});

/**
 * @desc    Get aggregate feedback statistics for Admin Dashboard
 * @route   GET /api/feedback/admin/statistics
 * @access  Private (Admin)
 */
const getFeedbackStatistics = asyncHandler(async (req, res) => {
  const total = await Feedback.countDocuments({});
  const newCount = await Feedback.countDocuments({ status: 'new' });
  const reviewedCount = await Feedback.countDocuments({ status: 'reviewed' });
  const resolvedCount = await Feedback.countDocuments({ status: 'resolved' });
  const archivedCount = await Feedback.countDocuments({ status: 'archived' });

  const veryHelpful = await Feedback.countDocuments({ rating: 'very-helpful' });
  const helpful = await Feedback.countDocuments({ rating: 'helpful' });
  const notHelpful = await Feedback.countDocuments({ rating: 'not-helpful' });

  const positive = veryHelpful + helpful;
  const helpfulnessRate = total > 0 ? Math.round((positive / total) * 100) : 0;

  res.status(200).json({
    success: true,
    data: {
      total,
      newCount,
      reviewedCount,
      resolvedCount,
      archivedCount,
      ratingBreakdown: {
        veryHelpful,
        helpful,
        notHelpful
      },
      helpfulnessRate
    }
  });
});

module.exports = {
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
};
