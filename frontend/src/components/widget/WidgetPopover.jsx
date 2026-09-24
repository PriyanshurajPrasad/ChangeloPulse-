import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { widgetService } from '../../services/widgetService';
import { useSocket } from '../../context/SocketContext';
import CategoryBadge from '../common/CategoryBadge';

export default function WidgetPopover() {
  const { lastEvent } = useSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const popoverRef = useRef(null);

  const fetchWidgetUpdates = async () => {
    setLoading(true);
    try {
      const res = await widgetService.getWidgetUpdates(5);
      if (res.success && res.data) {
        setUpdates(res.data);
      }
    } catch (err) {
      console.error('Failed to load widget updates', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchWidgetUpdates();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdateEvent = () => fetchWidgetUpdates();
    window.addEventListener('changelog:update', handleUpdateEvent);
    return () => window.removeEventListener('changelog:update', handleUpdateEvent);
  }, []);

  // Real-time Socket Listener
  useEffect(() => {
    if (
      lastEvent &&
      [
        'updateCreated',
        'updatePublished',
        'updateUpdated',
        'updateArchived',
        'updateDeleted'
      ].includes(lastEvent.type)
    ) {
      if (isOpen) {
        fetchWidgetUpdates();
      }
    }
  }, [lastEvent, isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-200"
        title="What's New in Product"
      >
        <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <span className="absolute top-1 right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-scale-up">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <h4 className="font-bold text-sm">What's New</h4>
            </div>
            <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">
              Latest Updates
            </span>
          </div>

          {/* Updates List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              <div className="p-6 text-center space-y-3">
                <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mx-auto" />
                <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mx-auto" />
              </div>
            ) : updates.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-sm">
                No recent product updates.
              </div>
            ) : (
              updates.map((item) => (
                <Link
                  key={item._id}
                  to={`/user/changelog/${item.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <CategoryBadge category={item.category} size="xs" />
                    <span className="text-xs font-medium text-slate-400">
                      {item.version}
                    </span>
                  </div>
                  <h5 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-1">
                    {item.title}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric'
                          })
                        : 'Recently'}
                    </span>
                    <span className="flex items-center gap-0.5 text-indigo-600 dark:text-indigo-400 font-medium">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Footer link */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              to="/user/changelog"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>View complete changelog</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
