import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle,
  FileClock,
  Archive,
  PlusCircle,
  ArrowRight,
  Sparkles,
  Eye,
  Edit,
  MessageSquare,
  Users
} from 'lucide-react';
import { updateService } from '../../services/updateService';
import { useSocket } from '../../context/SocketContext';
import StatsCard from '../../components/admin/StatsCard';
import CategoryBadge from '../../components/common/CategoryBadge';
import StatusBadge from '../../components/common/StatusBadge';
import { TableSkeleton } from '../../components/common/Skeleton';

export default function AdminDashboard() {
  const { lastEvent } = useSocket();
  const [updates, setUpdates] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    archived: 0,
    totalUsers: 0,
    totalFeedback: 0,
    newFeedback: 0,
    resolvedFeedback: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, updatesRes] = await Promise.all([
        updateService.getUpdateStats(),
        updateService.getUpdates({ limit: 5 })
      ]);

      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data);
      }

      if (updatesRes.success && updatesRes.data) {
        setUpdates(updatesRes.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard metrics', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    const handleUpdateEvent = () => fetchDashboardData();
    window.addEventListener('changelog:update', handleUpdateEvent);
    window.addEventListener('focus', handleUpdateEvent);

    return () => {
      window.removeEventListener('changelog:update', handleUpdateEvent);
      window.removeEventListener('focus', handleUpdateEvent);
    };
  }, []);

  // Listen to WebSocket events to auto-refresh metrics
  useEffect(() => {
    if (lastEvent) {
      fetchDashboardData();
    }
  }, [lastEvent]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Product Updates Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Admin Overview Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage release notes, draft features, track feedback, and monitor real-time platform metrics.
          </p>
        </div>

        <Link
          to="/admin/updates/create"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-lg shadow-indigo-500/25 transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Update</span>
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Updates" count={stats.total} icon={FileText} color="indigo" />
        <StatsCard title="Published Releases" count={stats.published} icon={CheckCircle} color="emerald" />
        <Link to="/admin/feedback" className="block hover:scale-[1.02] transition transform">
          <StatsCard title="User Feedback" count={stats.totalFeedback} icon={MessageSquare} color="amber" subtitle={`${stats.newFeedback || 0} New Pending`} />
        </Link>
        <StatsCard title="Registered Users" count={stats.totalUsers || 0} icon={Users} color="purple" />
      </div>

      {/* Recent Updates Table Preview */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Recent Product Updates
            </h3>
            <p className="text-xs text-slate-500">Showing 5 most recently updated records</p>
          </div>
          <Link
            to="/admin/updates"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>View All ({stats.total})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <TableSkeleton rows={4} />
        ) : updates.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No product updates found in the database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Version</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {updates.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100 max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <CategoryBadge category={item.category} size="xs" />
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                      {item.version}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Link
                        to={`/user/changelog/${item.slug}`}
                        className="inline-flex p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="View Public Detail"
                        aria-label="View Public Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/admin/updates/${item._id}/edit`}
                        className="inline-flex p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="Edit Update"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
