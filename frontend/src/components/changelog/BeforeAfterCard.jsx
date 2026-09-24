import React from 'react';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function BeforeAfterCard({ beforeAfter }) {
  if (!beforeAfter || (!beforeAfter.before && !beforeAfter.after)) return null;

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
        Before → After Comparison
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BEFORE */}
        <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 space-y-2">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
            <XCircle className="w-4 h-4" />
            <span>Before</span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {beforeAfter.before}
          </p>
        </div>

        {/* AFTER */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>After</span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {beforeAfter.after}
          </p>
        </div>
      </div>
    </section>
  );
}
