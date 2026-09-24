import React, { useState, useEffect } from 'react';
import { BarChart3, FileText, CheckCircle, FileClock, Archive, Sparkles, Layers } from 'lucide-react';
import { updateService } from '../../services/updateService';
import StatsCard from '../../components/admin/StatsCard';
import CategoryBadge from '../../components/common/CategoryBadge';
import { TableSkeleton } from '../../components/common/Skeleton';

export default function AdminStatisticsPage() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    archived: 0,
    categoryCounts: {}
  });
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const res = await updateService.getUpdateStats();
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Failed to load statistics', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();

    const handleUpdateEvent = () => loadStats();
    window.addEventListener('changelog:update', handleUpdateEvent);
    window.addEventListener('focus', handleUpdateEvent);

    return () => {
      window.removeEventListener('changelog:update', handleUpdateEvent);
      window.removeEventListener('focus', handleUpdateEvent);
    };
  }, []);

  const { total, published, drafts, archived, categoryCounts } = stats;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
          <BarChart3 className="w-4 h-4" />
          <span>Analytics & Metrics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Product Update Statistics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Real-time publication performance, status ratios, and category breakdowns.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Created Updates" count={total} icon={FileText} color="indigo" />
        <StatsCard title="Published Live" count={published} icon={CheckCircle} color="emerald" />
        <StatsCard title="Work in Progress (Drafts)" count={drafts} icon={FileClock} color="amber" />
        <StatsCard title="Archived Records" count={archived} icon={Archive} color="slate" />
      </div>

      {/* Category Distribution */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            <span>Category Breakdown</span>
          </h2>
          <span className="text-xs text-slate-400">Total: {total} updates</span>
        </div>

        {loading ? (
          <TableSkeleton rows={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['feature', 'improvement', 'bug-fix', 'announcement', 'release'].map((cat) => {
              const count = categoryCounts[cat] || 0;
              const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div
                  key={cat}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <CategoryBadge category={cat} />
                    <span className="text-sm font-black text-slate-900 dark:text-slate-100">
                      {count}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 dark:bg-indigo-400 h-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 font-semibold text-right">
                    {percentage}% of all updates
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
