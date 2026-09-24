import React, { useState, useEffect } from 'react';
import { MessageSquare, Search, Filter, RefreshCw, Eye, CheckCircle2, Clock, ThumbsUp, Smile, ThumbsDown, Archive } from 'lucide-react';
import { feedbackService } from '../../services/feedbackService';
import { useSocket } from '../../context/SocketContext';
import { useToast } from '../../context/ToastContext';
import AdminFeedbackDetailModal from '../../components/admin/AdminFeedbackDetailModal';

export default function AdminFeedbackPage() {
  const { lastEvent } = useSocket();
  const { showToast } = useToast();

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1, limit: 10 });
  const [counts, setCounts] = useState({ all: 0, new: 0, reviewed: 0, resolved: 0 });

  const [activeModalId, setActiveModalId] = useState(null);

  const fetchAdminFeedback = async () => {
    try {
      setLoading(true);
      const res = await feedbackService.getAllAdminFeedback({
        page,
        limit: 10,
        status: selectedStatus,
        rating: selectedRating,
        search
      });

      if (res.success) {
        setFeedbacks(res.data || []);
        if (res.pagination) setPagination(res.pagination);
        if (res.counts) setCounts(res.counts);
      }
    } catch (err) {
      console.error('Failed to fetch admin feedback:', err);
      showToast('Error loading feedback list', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminFeedback();
  }, [page, selectedStatus, selectedRating]);

  // Re-fetch on search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAdminFeedback();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Socket event auto-refresh
  useEffect(() => {
    if (lastEvent && ['feedbackCreated', 'feedbackUpdated', 'feedbackStatusChanged', 'feedbackReplied', 'feedbackDeleted'].includes(lastEvent.type)) {
      fetchAdminFeedback();
    }
  }, [lastEvent]);

  const getRatingBadge = (rat) => {
    switch (rat) {
      case 'very-helpful':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">👍 Very Helpful</span>;
      case 'helpful':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">🙂 Helpful</span>;
      case 'not-helpful':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300">👎 Not Helpful</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (st) => {
    switch (st) {
      case 'new':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"><Clock className="w-3 h-3" /> New</span>;
      case 'reviewed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800"><CheckCircle2 className="w-3 h-3" /> Reviewed</span>;
      case 'resolved':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"><CheckCircle2 className="w-3 h-3" /> Resolved</span>;
      case 'archived':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"><Archive className="w-3 h-3" /> Archived</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>User Feedback Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Feedback Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Review user feedback, answer inquiries, and track product update helpfulness.
          </p>
        </div>

        <button
          onClick={fetchAdminFeedback}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 border-b border-slate-100 dark:border-slate-800/80">
          {[
            { key: 'all', label: 'All Feedback', count: counts.all },
            { key: 'new', label: 'New', count: counts.new, badgeColor: 'bg-amber-500 text-white' },
            { key: 'reviewed', label: 'Reviewed', count: counts.reviewed },
            { key: 'resolved', label: 'Resolved', count: counts.resolved },
            { key: 'archived', label: 'Archived', count: counts.archived || 0 }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setSelectedStatus(tab.key);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                selectedStatus === tab.key
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${tab.badgeColor || (selectedStatus === tab.key ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200')}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Rating Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by user name, email, update title or message..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedRating}
              onChange={(e) => {
                setSelectedRating(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-auto px-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="all">All Reactions</option>
              <option value="very-helpful">👍 Very Helpful</option>
              <option value="helpful">🙂 Helpful</option>
              <option value="not-helpful">👎 Not Helpful</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feedback Table / List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <div className="w-8 h-8 mx-auto border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold">Loading feedback records...</p>
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <MessageSquare className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
            <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200">
              No Feedback Records Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              No user feedback matches your current filter or search criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-4">Update</th>
                  <th className="py-4 px-4">Rating</th>
                  <th className="py-4 px-4">Feedback Preview</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {feedbacks.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    {/* User */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                          alt={item.user?.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-extrabold text-slate-900 dark:text-slate-100">
                            {item.user?.name || 'Anonymous User'}
                          </p>
                          <p className="text-[11px] text-slate-400">{item.user?.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Target Update */}
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                          {item.update?.title || 'Unknown Update'}
                        </p>
                        <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                          {item.update?.version}
                        </span>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {getRatingBadge(item.rating)}
                    </td>

                    {/* Feedback Preview */}
                    <td className="py-4 px-4 max-w-xs">
                      <p className="text-slate-600 dark:text-slate-300 line-clamp-2 italic">
                        "{item.message}"
                      </p>
                      {item.adminReply && (
                        <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold mt-1">
                          ✓ Replied
                        </p>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-slate-400 font-medium">
                      {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => setActiveModalId(item._id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {pagination.pages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Page {pagination.page} of {pagination.pages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={page >= pagination.pages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Detail Modal */}
      {activeModalId && (
        <AdminFeedbackDetailModal
          feedbackId={activeModalId}
          onClose={() => setActiveModalId(null)}
          onFeedbackUpdated={fetchAdminFeedback}
        />
      )}
    </div>
  );
}
