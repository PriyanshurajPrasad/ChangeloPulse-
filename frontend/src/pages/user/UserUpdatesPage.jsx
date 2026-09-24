import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { updateService } from '../../services/updateService';
import { useDebounce } from '../../hooks/useDebounce';
import { useSocket } from '../../context/SocketContext';
import CategoryBadge from '../../components/common/CategoryBadge';
import Pagination from '../../components/changelog/Pagination';
import { UpdateCardSkeleton } from '../../components/common/Skeleton';

export default function UserUpdatesPage() {
  const { lastEvent } = useSocket();
  const [updates, setUpdates] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 350);

  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const res = await updateService.getPublicChangelog({
        page,
        limit: 8,
        search: debouncedSearch,
        category
      });
      if (res.success && res.data) {
        setUpdates(res.data);
        setPagination(res.pagination || null);
      }
    } catch (err) {
      console.error('Failed to fetch updates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();

    const handleUpdateEvent = () => fetchUpdates();
    window.addEventListener('changelog:update', handleUpdateEvent);
    window.addEventListener('focus', handleUpdateEvent);

    return () => {
      window.removeEventListener('changelog:update', handleUpdateEvent);
      window.removeEventListener('focus', handleUpdateEvent);
    };
  }, [page, debouncedSearch, category]);

  // Real-time socket synchronization for newly created, published, edited, archived, or deleted updates
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
      fetchUpdates();
    }
  }, [lastEvent]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Product Updates Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          All Product Updates & Release Notes
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Browse published updates, features, improvements, and bug fixes.
        </p>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative sm:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search release notes by title, version, or tags..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-medium"
            >
              <option value="">All Categories</option>
              <option value="feature">Feature</option>
              <option value="improvement">Improvement</option>
              <option value="bug-fix">Bug Fix</option>
              <option value="announcement">Announcement</option>
              <option value="release">Release</option>
            </select>
          </div>
        </div>
      </div>

      {/* Updates Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UpdateCardSkeleton />
          <UpdateCardSkeleton />
        </div>
      ) : updates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {updates.map((item) => (
            <Link
              key={item._id}
              to={`/user/changelog/${item.slug}`}
              className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <CategoryBadge category={item.category} />
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(item.publishedAt || item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400">
                <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-[11px]">
                  v{item.version}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition flex items-center gap-1">
                  View Full Release <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-500 text-sm">
          No product updates found matching your search.
        </div>
      )}

      {/* Pagination */}
      {!loading && pagination && (
        <Pagination pagination={pagination} onPageChange={(p) => setPage(p)} />
      )}
    </div>
  );
}
