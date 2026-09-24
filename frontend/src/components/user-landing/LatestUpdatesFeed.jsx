import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag, BookOpen } from 'lucide-react';
import CategoryBadge from '../common/CategoryBadge';
import { UpdateCardSkeleton } from '../common/Skeleton';

export default function LatestUpdatesFeed({ updates, loading }) {
  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Product Stream</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Latest Published Releases
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time updates published directly by the product team.
          </p>
        </div>

        <Link
          to="/user/changelog"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 transition self-start sm:self-auto"
        >
          <span>View All Releases</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UpdateCardSkeleton />
          <UpdateCardSkeleton />
          <UpdateCardSkeleton />
        </div>
      ) : updates.length === 0 ? (
        <div className="p-12 text-center text-slate-400 space-y-2 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <BookOpen className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No Published Updates Yet</p>
          <p className="text-xs text-slate-400">Published product updates will appear here automatically.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {updates.slice(0, 3).map((up) => (
            <div
              key={up._id}
              className="group bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-800 transition duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Cover Image if present */}
                {up.coverImage && (
                  <div className="rounded-xl overflow-hidden h-36 w-full bg-slate-100 dark:bg-slate-800">
                    <img
                      src={up.coverImage}
                      alt={up.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Top Bar: Category & Version */}
                <div className="flex items-center justify-between gap-2">
                  <CategoryBadge category={up.category} size="xs" />
                  <span className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900">
                    {up.version}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition line-clamp-2">
                    {up.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mt-1.5 leading-relaxed">
                    {up.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(up.publishedAt || up.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>

                <Link
                  to={`/user/changelog/${up.slug}`}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 text-xs"
                >
                  <span>Read Update</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
