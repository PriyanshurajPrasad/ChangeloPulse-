const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      index: true
    },
    update: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Update',
      required: [true, 'Update reference is required'],
      index: true
    },
    rating: {
      type: String,
      required: [true, 'Rating is required'],
      enum: {
        values: ['very-helpful', 'helpful', 'not-helpful'],
        message: 'Invalid rating. Must be very-helpful, helpful, or not-helpful'
      }
    },
    message: {
      type: String,
      required: [true, 'Feedback message is required'],
      trim: true,
      minlength: [5, 'Feedback message must be at least 5 characters long'],
      maxlength: [1000, 'Feedback message cannot exceed 1000 characters']
    },
    status: {
      type: String,
      enum: {
        values: ['new', 'reviewed', 'resolved', 'archived'],
        message: 'Status must be new, reviewed, resolved, or archived'
      },
      default: 'new',
      index: true
    },
    adminReply: {
      type: String,
      default: '',
      trim: true
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    reviewedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Unique compound index: One feedback per user per update
feedbackSchema.index({ user: 1, update: 1 }, { unique: true });

// Query optimization indexes
feedbackSchema.index({ update: 1, createdAt: -1 });
feedbackSchema.index({ status: 1, createdAt: -1 });

feedbackSchema.methods.toJSON = function () {
  const feedbackObj = this.toObject();
  delete feedbackObj.__v;
  return feedbackObj;
};

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
