import React, { useState, useEffect } from 'react';
import { MessageSquare, Clock, CheckCircle2, ExternalLink, RefreshCw, ThumbsUp, Smile, ThumbsDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { feedbackService } from '../../services/feedbackService';
import { useSocket } from '../../context/SocketContext';
import { useToast } from '../../context/ToastContext';

export default function UserFeedbackHistoryPage() {
  const { lastEvent } = useSocket();
  const { showToast } = useToast();

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyFeedback = async () => {
    try {
      setLoading(true);
      const res = await feedbackService.getMyFeedback();
      if (res.success && res.data) {
        setFeedbacks(res.data);
      }
    } catch (err) {
      console.error('Failed to load my feedback:', err);
      showToast('Error loading your feedback history', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyFeedback();
  }, []);

  useEffect(() => {
    if (lastEvent && ['feedbackCreated', 'feedbackUpdated', 'feedbackStatusChanged', 'feedbackReplied', 'feedbackDeleted'].includes(lastEvent.type)) {
      fetchMyFeedback();
    }
  }, [lastEvent]);

  const getRatingBadge = (rat) => {
    switch (rat) {
      case 'very-helpful':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300">👍 Very Helpful</span>;
      case 'helpful':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">🙂 Helpful</span>;
      case 'not-helpful':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300">👎 Not Helpful</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (st) => {
    switch (st) {
      case 'new':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"><Clock className="w-3 h-3" /> Submitted / Under Review</span>;
      case 'reviewed':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800"><CheckCircle2 className="w-3 h-3" /> Reviewed by Team</span>;
      case 'resolved':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"><CheckCircle2 className="w-3 h-3" /> Resolved</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>User Activity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            My Feedback & Responses
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track all product feedback you have submitted and read official team responses.
          </p>
        </div>

        <button
          onClick={fetchMyFeedback}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 space-y-3">
          <div className="w-8 h-8 mx-auto border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold">Loading your feedback history...</p>
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <MessageSquare className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              No Feedback Submitted Yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              You haven't submitted feedback on any product updates yet. Open any changelog release to share your thoughts with the team!
            </p>
          </div>
          <Link
            to="/user/changelog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition"
          >
            <span>Explore Changelog Updates</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 transition hover:border-slate-300 dark:hover:border-slate-700"
            >
              {/* Header: Update Title + Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Product Update
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span>{item.update?.title || 'Product Update'}</span>
                    <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">({item.update?.version})</span>
                  </h3>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {getRatingBadge(item.rating)}
                  {getStatusBadge(item.status)}
                </div>
              </div>

              {/* Your Message */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                "{item.message}"
              </div>

              {/* Official Team Response (if available) */}
              {item.adminReply && (
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-200">
                    <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Response from ChangelogPulse Team</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-6">
                    "{item.adminReply}"
                  </p>
                </div>
              )}

              {/* Bottom bar */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                <span>Submitted on {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>

                {item.update?.slug && (
                  <Link
                    to={`/user/changelog/${item.update.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline text-xs"
                  >
                    <span>View Update Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
