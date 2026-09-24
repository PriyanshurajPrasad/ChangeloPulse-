import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { feedbackService } from '../../services/feedbackService';
import { useSocket } from '../../context/SocketContext';

export default function UserFeedbackSummary() {
  const { lastEvent } = useSocket();
  const [recentFeedback, setRecentFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyRecentFeedback = async () => {
    try {
      setLoading(true);
      const res = await feedbackService.getMyFeedback();
      if (res.success && res.data && res.data.length > 0) {
        setRecentFeedback(res.data[0]); // Pick most recent submission
      } else {
        setRecentFeedback(null);
      }
    } catch (err) {
      console.error('Error fetching user feedback summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRecentFeedback();
  }, []);

  useEffect(() => {
    if (lastEvent && ['feedbackCreated', 'feedbackUpdated', 'feedbackStatusChanged', 'feedbackReplied'].includes(lastEvent.type)) {
      fetchMyRecentFeedback();
    }
  }, [lastEvent]);

  const getStatusBadge = (st) => {
    switch (st) {
      case 'new':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"><Clock className="w-3 h-3" /> Submitted</span>;
      case 'reviewed':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300"><CheckCircle2 className="w-3 h-3" /> Reviewed</span>;
      case 'resolved':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"><CheckCircle2 className="w-3 h-3" /> Resolved</span>;
      default:
        return null;
    }
  };

  if (loading) return null;

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Community Voice</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">
            Your Feedback Shapes What Comes Next
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Found an update useful? Have a suggestion? Share your thoughts directly with the product team.
          </p>
        </div>

        <Link
          to="/user/feedback"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 transition self-start sm:self-auto shrink-0"
        >
          <span>{recentFeedback ? 'View My Submissions' : 'Share Feedback'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {recentFeedback ? (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Recent Submission on: {recentFeedback.update?.title}
              </span>
              {getStatusBadge(recentFeedback.status)}
            </div>
            <span className="text-[11px] text-slate-400">
              {new Date(recentFeedback.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            "{recentFeedback.message}"
          </p>

          {recentFeedback.adminReply && (
            <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/50 text-xs space-y-1 border border-indigo-100 dark:border-indigo-900">
              <p className="font-bold text-indigo-900 dark:text-indigo-200">Official Team Reply:</p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-2">
                "{recentFeedback.adminReply}"
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <p className="text-slate-500 dark:text-slate-400">
            You haven't submitted feedback on any product updates yet.
          </p>
          <Link
            to="/user/changelog"
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
          >
            Explore Updates & Comment →
          </Link>
        </div>
      )}
    </section>
  );
}
