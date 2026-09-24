import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function UpdateNavigation() {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast('Direct link copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex items-center justify-between">
      <Link
        to="/changelog"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Changelog Feed</span>
      </Link>

      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
        <span>{copied ? 'Copied' : 'Share Update'}</span>
      </button>
    </div>
  );
}
