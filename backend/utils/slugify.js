const crypto = require('crypto');

/**
 * Converts a string into a clean, URL-friendly slug.
 * @param {string} text - Title text to convert
 * @returns {string} slugified text
 */
const createSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W_]+(?!\s*)/g, '-') // Replace spaces and non-word chars with -
    .replace(/^-+|-+$/g, '');          // Trim leading and trailing hyphens
};

/**
 * Generates a unique slug by checking against existing Mongoose Model entries.
 * @param {Model} Model - Mongoose Model (Update)
 * @param {string} title - Title string
 * @param {string} [currentId] - Exclude current document ID when updating
 * @returns {Promise<string>} unique slug
 */
const generateUniqueSlug = async (Model, title, currentId = null) => {
  let slug = createSlug(title);
  if (!slug) {
    slug = `update-${crypto.randomBytes(3).toString('hex')}`;
  }

  let existingQuery = { slug };
  if (currentId) {
    existingQuery._id = { $ne: currentId };
  }

  const existingDoc = await Model.findOne(existingQuery);
  if (existingDoc) {
    const randomSuffix = crypto.randomBytes(3).toString('hex');
    slug = `${slug}-${randomSuffix}`;
  }

  return slug;
};

module.exports = {
  createSlug,
  generateUniqueSlug
};
