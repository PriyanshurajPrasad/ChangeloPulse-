import React from 'react';
import { Calendar, User, Tag } from 'lucide-react';
import CategoryBadge from '../common/CategoryBadge';

export default function UpdateHeader({ update }) {
  const publishedDateFormatted = update.publishedAt
    ? new Date(update.publishedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Recently';

  return (
    <header className="space-y-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
      {/* Category & Version Badges */}
      <div className="flex flex-wrap items-center gap-2.5">
        <CategoryBadge category={update.category} />
        <span className="px-3 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-mono font-bold tracking-tight">
          Version {update.version}
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
        {update.title}
      </h1>

      {/* Short Summary Lead */}
      <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
        {update.description}
      </p>

      {/* Date & Author Info */}
      <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-2">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-indigo-500" />
          <time dateTime={update.publishedAt}>{publishedDateFormatted}</time>
        </div>

        {update.author && (
          <div className="flex items-center gap-2">
            <img
              src={update.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={update.author.name}
              className="w-5 h-5 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <span className="font-bold text-slate-700 dark:text-slate-300">{update.author.name}</span>
          </div>
        )}
      </div>
    </header>
  );
}
