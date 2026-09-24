import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { updateService } from '../../services/updateService';
import UpdateCard from '../changelog/UpdateCard';
import { UpdateCardSkeleton } from '../common/Skeleton';

export default function ChangelogPreviewSection() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await updateService.getPublicChangelog({ limit: 3 });
        if (res.success && res.data) {
          setUpdates(res.data);
        }
      } catch (err) {
        console.error('Failed to load changelog preview', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Feed Preview</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Your product story, beautifully organized
          </h2>
        </div>

        <Link
          to="/changelog"
          className="inline-flex items-center gap-2 font-bold text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <span>View All Published Releases</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of Update Cards */}
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-6">
            <UpdateCardSkeleton />
            <UpdateCardSkeleton />
          </div>
        ) : updates.length === 0 ? (
          <div className="p-12 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            No published product updates available yet.
          </div>
        ) : (
          updates.map((item) => <UpdateCard key={item._id} update={item} />)
        )}
      </div>
    </section>
  );
}
