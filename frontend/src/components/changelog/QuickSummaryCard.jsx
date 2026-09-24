import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export default function QuickSummaryCard({ highlights }) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/40 dark:to-purple-950/30 border border-indigo-200/80 dark:border-indigo-900/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="text-lg font-extrabold text-indigo-950 dark:text-indigo-100 tracking-tight">
          What's New? (At a Glance)
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {highlights.map((point, idx) => (
          <div key={idx} className="flex items-start gap-3 bg-white/70 dark:bg-slate-900/70 p-3 rounded-2xl border border-indigo-100/80 dark:border-indigo-900/40">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
              {point}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
