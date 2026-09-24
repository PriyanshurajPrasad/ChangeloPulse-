import React, { useState, useEffect } from 'react';
import { X, User, MessageSquare, Clock, CheckCircle2, Send, ExternalLink, Trash2, AlertCircle, Archive } from 'lucide-react';
import { Link } from 'react-router-dom';
import { feedbackService } from '../../services/feedbackService';
import { useToast } from '../../context/ToastContext';

export default function AdminFeedbackDetailModal({ feedbackId, onClose, onFeedbackUpdated }) {
  const { showToast } = useToast();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false);

  const fetchDetail = async () => {
    if (!feedbackId) return;
    try {
      setLoading(true);
      const res = await feedbackService.getAdminFeedbackById(feedbackId);
      if (res.success && res.data) {
        setFeedback(res.data);
        setReplyText(res.data.adminReply || '');
      }
    } catch (err) {
      showToast('Failed to load feedback details', 'error');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [feedbackId]);

  const handleStatusChange = async (newStatus) => {
    try {
      setStatusUpdating(true);
      const res = await feedbackService.updateFeedbackStatus(feedbackId, newStatus);
      if (res.success) {
        showToast(`Feedback status updated to ${newStatus}`, 'success');
        setFeedback(res.data);
        if (onFeedbackUpdated) onFeedbackUpdated();
      }
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      setReplying(true);
      const res = await feedbackService.replyToFeedback(feedbackId, replyText.trim(), 'reviewed');
      if (res.success) {
        showToast('Admin reply sent successfully', 'success');
        setFeedback(res.data);
        if (onFeedbackUpdated) onFeedbackUpdated();
      }
    } catch (err) {
      showToast(err.message || 'Failed to send reply', 'error');
    } finally {
      setReplying(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this feedback record?')) return;
    try {
      const res = await feedbackService.deleteAdminFeedback(feedbackId);
      if (res.success) {
        showToast('Feedback deleted successfully', 'success');
        if (onFeedbackUpdated) onFeedbackUpdated();
        onClose();
      }
    } catch (err) {
      showToast(err.message || 'Failed to delete feedback', 'error');
    }
  };

  const getRatingBadge = (rat) => {
    switch (rat) {
      case 'very-helpful':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">👍 Very Helpful</span>;
      case 'helpful':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">🙂 Helpful</span>;
      case 'not-helpful':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">👎 Not Helpful</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (st) => {
    switch (st) {
      case 'new':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"><Clock className="w-3.5 h-3.5" /> New</span>;
      case 'reviewed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300"><CheckCircle2 className="w-3.5 h-3.5" /> Reviewed</span>;
      case 'resolved':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"><CheckCircle2 className="w-3.5 h-3.5" /> Resolved</span>;
      case 'archived':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"><Archive className="w-3.5 h-3.5" /> Archived</span>;
      default:
        return null;
    }
  };

  if (!feedbackId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              Feedback Details
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {loading || !feedback ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <div className="w-8 h-8 mx-auto border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold">Loading feedback details...</p>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Top Bar: User & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center gap-3">
                <img
                  src={feedback.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={feedback.user?.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {feedback.user?.name || 'Anonymous User'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {feedback.user?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {getRatingBadge(feedback.rating)}
                {getStatusBadge(feedback.status)}
              </div>
            </div>

            {/* Target Update Box */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Target Product Update
                </p>
                <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {feedback.update?.title} <span className="text-xs text-indigo-600 font-mono">({feedback.update?.version})</span>
                </h5>
              </div>
              {feedback.update?.slug && (
                <Link
                  to={`/user/changelog/${feedback.update.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:underline"
                >
                  <span>View Update</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            {/* User Message */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                User Feedback Message
              </label>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                "{feedback.message}"
              </div>
              <p className="text-[11px] text-slate-400 pl-1">
                Submitted on {new Date(feedback.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Status Quick Toggle */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Change Feedback Status
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={statusUpdating || feedback.status === 'new'}
                  onClick={() => handleStatusChange('new')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 disabled:opacity-50 transition"
                >
                  Mark as New
                </button>
                <button
                  type="button"
                  disabled={statusUpdating || feedback.status === 'reviewed'}
                  onClick={() => handleStatusChange('reviewed')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 disabled:opacity-50 transition"
                >
                  Mark as Reviewed
                </button>
                <button
                  type="button"
                  disabled={statusUpdating || feedback.status === 'resolved'}
                  onClick={() => handleStatusChange('resolved')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 disabled:opacity-50 transition"
                >
                  Mark as Resolved
                </button>
                <button
                  type="button"
                  disabled={statusUpdating || feedback.status === 'archived'}
                  onClick={() => handleStatusChange('archived')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 disabled:opacity-50 transition"
                >
                  Mark as Archived
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="ml-auto px-3 py-1.5 rounded-xl text-xs font-bold border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            {/* Admin Reply Form */}
            <form onSubmit={handleSendReply} className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Official Admin Response
              </label>
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write an official response to this feedback..."
                className="w-full p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={replying || !replyText.trim()}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 disabled:opacity-50 transition flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{replying ? 'Sending...' : 'Send Response'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
