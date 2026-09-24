import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, User } from 'lucide-react';
import CategoryBadge from '../common/CategoryBadge';

export default function UpdateCard({ update }) {
  const publishedDateFormatted = update.publishedAt
    ? new Date(update.publishedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Recently';

  return (
    <article className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      {/* Top Bar: Category & Version */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <CategoryBadge category={update.category} />
          <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold tracking-tight">
            {update.version}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={update.publishedAt}>{publishedDateFormatted}</time>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition leading-snug">
        <Link to={`/user/changelog/${update.slug}`}>{update.title}</Link>
      </h3>

      {/* Cover Image if available */}
      {update.coverImage && (
        <div className="mt-4 mb-4 rounded-2xl overflow-hidden max-h-72 bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
          <img
            src={update.coverImage}
            alt={update.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Description */}
      <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
        {update.description}
      </p>

      {/* Tags */}
      {update.tags && update.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          {update.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs font-medium"
            >
              <Tag className="w-3 h-3" />
              <span>#{tag}</span>
            </span>
          ))}
        </div>
      )}

      {/* Footer / Read More */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        {update.author && (
          <div className="flex items-center gap-2">
            <img
              src={update.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={update.author.name || 'Author'}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {update.author.name || 'Product Team'}
            </span>
          </div>
        )}

        <Link
          to={`/user/changelog/${update.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group-hover:translate-x-1 transition duration-200"
        >
          <span>Read update</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
