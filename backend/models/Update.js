const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters']
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true
    },
    version: {
      type: String,
      required: [true, 'Version is required'],
      trim: true,
      default: 'v1.0.0'
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['feature', 'improvement', 'bug-fix', 'announcement', 'release'],
        message: 'Invalid category. Must be feature, improvement, bug-fix, announcement, or release'
      },
      index: true
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['draft', 'published', 'archived'],
        message: 'Status must be draft, published, or archived'
      },
      default: 'draft',
      index: true
    },
    coverImage: {
      type: String,
      default: ''
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required']
    },
    publishedAt: {
      type: Date,
      index: true,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes for fast filtering & pagination
updateSchema.index({ status: 1, publishedAt: -1 });
updateSchema.index({ status: 1, category: 1, publishedAt: -1 });
updateSchema.index({ title: 'text', description: 'text', content: 'text', tags: 'text' });

// Clean up document output format
updateSchema.methods.toJSON = function () {
  const updateObj = this.toObject();
  delete updateObj.__v;
  return updateObj;
};

const Update = mongoose.model('Update', updateSchema);

module.exports = Update;
