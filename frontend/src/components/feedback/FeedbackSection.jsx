import React, { useState, useEffect } from 'react';
import { ThumbsUp, Smile, ThumbsDown, Send, CheckCircle2, Clock, MessageSquare, Edit3, Sparkles } from 'lucide-react';
import { feedbackService } from '../../services/feedbackService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useSocket } from '../../context/SocketContext';

export default function FeedbackSection({ updateId }) {
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();
  const { lastEvent } = useSocket();

  const [stats, setStats] = useState({
    totalCount: 0,
    veryHelpfulCount: 0,
    helpfulCount: 0,
    notHelpfulCount: 0,
    helpfulnessPercent: 0,
    userFeedback: null
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [rating, setRating] = useState('very-helpful');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  const fetchFeedbackData = async () => {
    if (!updateId) return;
    try {
      setLoading(true);
      const res = await feedbackService.getFeedbackForUpdate(updateId);
      if (res.success && res.data) {
        setStats(res.data);
        if (res.data.userFeedback) {
          setRating(res.data.userFeedback.rating);
          setMessage(res.data.userFeedback.message);
        }
      }
    } catch (err) {
      console.error('Failed to load feedback stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbackData();
  }, [updateId, isAuthenticated]);

  // Listen to socket events to auto-refresh stats & feedback
  useEffect(() => {
    if (lastEvent && ['feedbackCreated', 'feedbackUpdated', 'feedbackStatusChanged', 'feedbackReplied', 'feedbackDeleted'].includes(lastEvent.type)) {
      fetchFeedbackData();
    }
  }, [lastEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast('Please sign in to submit feedback', 'warning');
      return;
    }

    if (!message.trim() || message.trim().length < 5) {
      setFormError('Feedback message must be at least 5 characters long');
      return;
    }

    setSubmitting(true);
    setFormError('');

    try {
      const res = await feedbackService.createOrUpdateFeedback({
        updateId,
        rating,
        message: message.trim()
      });

      if (res.success) {
        showToast(res.message || 'Feedback submitted successfully!', 'success');
        setIsEditing(false);
        fetchFeedbackData();
      }
    } catch (err) {
      setFormError(err.message || 'Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

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
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"><Clock className="w-3 h-3" /> Submitted / Under Review</span>;
      case 'reviewed':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800"><CheckCircle2 className="w-3 h-3" /> Reviewed by Team</span>;
      case 'resolved':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"><CheckCircle2 className="w-3 h-3" /> Resolved</span>;
      default:
        return null;
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 space-y-8">
      {/* Feedback Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Community Feedback</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            Was this update helpful?
          </h3>
        </div>

        {/* Aggregate Stats Bar */}
        {stats.totalCount > 0 && (
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {stats.helpfulnessPercent}% Positive Rating
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Based on {stats.totalCount} {stats.totalCount === 1 ? 'user response' : 'user responses'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-extrabold text-sm border border-emerald-500/20">
              {stats.helpfulnessPercent}%
            </div>
          </div>
        )}
      </div>

      {/* User Submitted Feedback Card (If user already submitted & not editing) */}
      {stats.userFeedback && !isEditing ? (
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Your Feedback:</span>
                {getRatingBadge(stats.userFeedback.rating)}
                {getStatusBadge(stats.userFeedback.status)}
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Submitted on {new Date(stats.userFeedback.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Feedback</span>
            </button>
          </div>

          <p className="text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 leading-relaxed font-medium">
            "{stats.userFeedback.message}"
          </p>

          {/* Admin Response Block */}
          {stats.userFeedback.adminReply && (
            <div className="mt-4 p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-200">
                <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Response from ChangelogPulse Team</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-6">
                "{stats.userFeedback.adminReply}"
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Feedback Submission Form */
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          {formError && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-700 dark:text-rose-300">
              {formError}
            </div>
          )}

          {/* Rating Choice Buttons */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Select Reaction
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setRating('very-helpful')}
                className={`p-3.5 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  rating === 'very-helpful'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <ThumbsUp className="w-4 h-4 text-emerald-500" />
                <span>Very Helpful</span>
              </button>

              <button
                type="button"
                onClick={() => setRating('helpful')}
                className={`p-3.5 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  rating === 'helpful'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <Smile className="w-4 h-4 text-indigo-500" />
                <span>Helpful</span>
              </button>

              <button
                type="button"
                onClick={() => setRating('not-helpful')}
                className={`p-3.5 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  rating === 'not-helpful'
                    ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <ThumbsDown className="w-4 h-4 text-rose-500" />
                <span>Not Helpful</span>
              </button>
            </div>
          </div>

          {/* Comment Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="feedback-message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Additional Comments
              </label>
              <span className="text-[11px] text-slate-400">
                {message.length}/1000
              </span>
            </div>
            <textarea
              id="feedback-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you liked about this update or what we can improve..."
              maxLength={1000}
              required
              className="w-full p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {stats.userFeedback && isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={submitting || !isAuthenticated}
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 disabled:opacity-50 transition flex items-center gap-2"
            >
              {submitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>{stats.userFeedback ? 'Update Feedback' : 'Submit Feedback'}</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
