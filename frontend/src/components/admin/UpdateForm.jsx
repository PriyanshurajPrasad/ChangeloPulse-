import React, { useState, useEffect } from 'react';
import { Loader2, Save, Send, Bold, Italic, Heading, List, Code, Quote, Minus } from 'lucide-react';

export default function UpdateForm({ initialValues = {}, onSubmit, loading, submitText = 'Save Update' }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'feature',
    version: 'v1.0.0',
    status: 'draft',
    coverImage: '',
    tags: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setFormData({
        title: initialValues.title || '',
        description: initialValues.description || '',
        content: initialValues.content || '',
        category: initialValues.category || 'feature',
        version: initialValues.version || 'v1.0.0',
        status: initialValues.status || 'draft',
        coverImage: initialValues.coverImage || '',
        tags: Array.isArray(initialValues.tags) ? initialValues.tags.join(', ') : initialValues.tags || ''
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Insert markdown syntax helper into content textarea
  const insertMarkdown = (prefix, suffix = '') => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content ? `${prev.content}\n${prefix} ${suffix}` : `${prefix} ${suffix}`
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Title is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!formData.content.trim()) errs.content = 'Full content is required';
    if (!formData.version.trim()) errs.version = 'Version string is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      tags: formData.tags
        ? formData.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : []
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      {/* Title */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Update Title <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Example: Faster Dashboard Loading & Security Enhancements"
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        {errors.title && <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.title}</p>}
      </div>

      {/* Grid: Version, Category, Status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Version <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="version"
            value={formData.version}
            onChange={handleChange}
            placeholder="e.g., v2.4.0"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-mono"
          />
          {errors.version && <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.version}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Category <span className="text-rose-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-medium"
          >
            <option value="feature">Feature</option>
            <option value="improvement">Improvement</option>
            <option value="bug-fix">Bug Fix</option>
            <option value="announcement">Announcement</option>
            <option value="release">Release</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Status <span className="text-rose-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-medium"
          >
            <option value="draft">Draft (Private)</option>
            <option value="published">Published (Public Feed)</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Short Description / Summary <span className="text-rose-500">*</span>
        </label>
        <textarea
          name="description"
          rows={2}
          value={formData.description}
          onChange={handleChange}
          placeholder="Briefly explain what changed in one or two sentences..."
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        {errors.description && <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.description}</p>}
      </div>

      {/* Full Content Editor with Markdown Toolbar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Full Release Article Content (Markdown Supported) <span className="text-rose-500">*</span>
          </label>

          {/* Markdown Quick Toolbar */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => insertMarkdown('###', 'Section Heading')}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
              title="Add Heading"
            >
              <Heading className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('- ', 'Highlight Point')}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
              title="Add Bullet Point"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('`', 'inline code`')}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
              title="Add Code Snippet"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('> ', 'Quote or note text')}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
              title="Add Blockquote"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <textarea
          name="content"
          rows={10}
          value={formData.content}
          onChange={handleChange}
          placeholder="Explain what changed, why it changed, and how it affects users..."
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-mono leading-relaxed"
        />
        {errors.content && <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.content}</p>}
      </div>

      {/* Cover Image URL & Tags */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Cover Image URL (Optional)
          </label>
          <input
            type="url"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Tags (Comma Separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="security, auth, performance"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/25 disabled:opacity-50 transition"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : formData.status === 'published' ? (
            <Send className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{loading ? 'Saving...' : submitText}</span>
        </button>
      </div>
    </form>
  );
}
