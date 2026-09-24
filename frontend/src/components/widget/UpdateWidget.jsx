import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { widgetService } from '../../services/widgetService';
import CategoryBadge from '../common/CategoryBadge';

export default function UpdateWidget({ limit = 4 }) {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchWidgetData = async () => {
    try {
      setLoading(true);
      const res = await widgetService.getWidgetUpdates(limit);
      if (res.success && res.data) {
        setUpdates(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch widget updates', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWidgetData();

    const handleUpdateEvent = () => fetchWidgetData();
    window.addEventListener('changelog:update', handleUpdateEvent);
    window.addEventListener('focus', handleUpdateEvent);

    return () => {
      window.removeEventListener('changelog:update', handleUpdateEvent);
      window.removeEventListener('focus', handleUpdateEvent);
    };
  }, [limit]);

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
      {/* Widget Header */}
      <div className="p-5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
            <Sparkles className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <h3 className="font-bold text-base leading-snug">What's New</h3>
            <p className="text-xs text-indigo-200">Latest product updates & features</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/10">
          Live Widget
        </span>
      </div>

      {/* Updates Stream */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
        {loading ? (
          <div className="p-6 space-y-4">
            <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>
        ) : updates.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No published product updates available yet.
          </div>
        ) : (
          updates.map((item) => (
            <Link
              key={item._id}
              to={`/user/changelog/${item.slug}`}
              className="block p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition group"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <CategoryBadge category={item.category} size="xs" />
                <span className="text-[11px] font-semibold text-slate-400">
                  {item.version}
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition line-clamp-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-slate-400">
                <span>
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })
                    : 'Recent'}
                </span>
                <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition">
                  Details <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Widget Footer */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/80 text-center">
        <Link
          to="/user/changelog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
        >
          <span>Explore Full Product Changelog</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
