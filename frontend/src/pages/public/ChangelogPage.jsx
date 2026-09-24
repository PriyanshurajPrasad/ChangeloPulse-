import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { updateService } from '../../services/updateService';
import { useDebounce } from '../../hooks/useDebounce';
import { useSocket } from '../../context/SocketContext';
import UpdateCard from '../../components/changelog/UpdateCard';
import CategoryFilter from '../../components/changelog/CategoryFilter';
import SearchBar from '../../components/changelog/SearchBar';
import Pagination from '../../components/changelog/Pagination';
import EmptyState from '../../components/common/EmptyState';
import { UpdateCardSkeleton } from '../../components/common/Skeleton';

export default function ChangelogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { lastEvent } = useSocket();

  // Read URL query params
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const pageParam = parseInt(searchParams.get('page'), 10) || 1;

  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [page, setPage] = useState(pageParam);

  const [updates, setUpdates] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 350);

  // Sync state with URL search params
  const updateQueryParams = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (val) {
        updated.set(key, val);
      } else {
        updated.delete(key);
      }
    });
    setSearchParams(updated);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
    updateQueryParams({ category, page: 1 });
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    updateQueryParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync debounced search to URL
  useEffect(() => {
    updateQueryParams({ search: debouncedSearch, page: 1 });
  }, [debouncedSearch]);

  // Fetch Public Changelog updates from Backend API
  const fetchChangelog = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateService.getPublicChangelog({
        page,
        limit: 6,
        category: selectedCategory,
        search: debouncedSearch
      });

      if (res.success) {
        setUpdates(res.data || []);
        setPagination(res.pagination || null);
      }
    } catch (err) {
      console.error('Failed to load changelog', err);
      setError(err.message || 'Could not fetch product updates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChangelog();

    const handleUpdateEvent = () => fetchChangelog();
    window.addEventListener('changelog:update', handleUpdateEvent);
    window.addEventListener('focus', handleUpdateEvent);

    return () => {
      window.removeEventListener('changelog:update', handleUpdateEvent);
      window.removeEventListener('focus', handleUpdateEvent);
    };
  }, [selectedCategory, debouncedSearch, page]);

  // Socket event auto-refresh
  useEffect(() => {
    if (lastEvent) {
      fetchChangelog();
    }
  }, [lastEvent]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Product Updates & Release Notes</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          What's New in Product
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Discover our latest features, fixes, performance improvements, and release notes.
        </p>
      </div>

      {/* Search & Category Filter Control Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
        <CategoryFilter selectedCategory={selectedCategory} onChange={handleCategoryChange} />
      </div>

      {/* Main Changelog Stream */}
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-6">
            <UpdateCardSkeleton />
            <UpdateCardSkeleton />
            <UpdateCardSkeleton />
          </div>
        ) : error ? (
          <EmptyState
            title="Unable to load updates"
            description={error}
            actionLabel="Try Again"
            onAction={fetchChangelog}
          />
        ) : updates.length === 0 ? (
          <EmptyState
            title="No product updates found"
            description={
              debouncedSearch || selectedCategory
                ? 'No published updates match your current filter criteria. Try clearing search keywords.'
                : 'There are no published product updates yet. Check back soon!'
            }
            actionLabel={debouncedSearch || selectedCategory ? 'Clear Filters' : undefined}
            onAction={() => {
              setSearchTerm('');
              setSelectedCategory('');
              setPage(1);
              setSearchParams({});
            }}
          />
        ) : (
          <div className="space-y-6">
            {updates.map((update) => (
              <UpdateCard key={update._id} update={update} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && !error && pagination && (
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
