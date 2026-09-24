import React from 'react';
import { Sparkles, Bell, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
import CategoryBadge from '../common/CategoryBadge';

export default function HeroProductPreview() {
  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-2 sm:p-4 shadow-xl dark:shadow-2xl shadow-indigo-500/10 overflow-hidden transition-colors duration-300">
      {/* Top Browser Window Frame */}
      <div className="flex items-center justify-between pb-3 px-3 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-3 text-xs font-mono text-slate-500 dark:text-slate-400">app.changelogpulse.com/feed</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
            Live Sync
          </span>
        </div>
      </div>

      {/* Mockup Dashboard Content */}
      <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-2xl space-y-4 border border-slate-200/60 dark:border-slate-800/80 transition-colors duration-300">
        {/* Mock Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">Acme Corp Changelog</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Product updates stream</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-500/30">
              v2.3.0 Released
            </span>
          </div>
        </div>

        {/* Feature Cards List */}
        <div className="space-y-3">
          {/* Card 1 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/40 transition">
            <div className="flex items-center justify-between mb-2">
              <CategoryBadge category="feature" size="xs" />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">v2.3.0 • Today</span>
            </div>
            <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">AI-Powered Analytics Dashboard</h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Natural language insights, automated anomaly detection, and interactive report exports.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/40 transition">
            <div className="flex items-center justify-between mb-2">
              <CategoryBadge category="improvement" size="xs" />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">v2.2.4 • Yesterday</span>
            </div>
            <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">4x Faster Global Search Speeds</h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Index-backed query optimization for instant fuzzy search across update tags and descriptions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

