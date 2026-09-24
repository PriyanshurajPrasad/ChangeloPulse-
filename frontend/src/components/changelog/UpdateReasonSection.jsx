import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function UpdateReasonSection({ reason }) {
  if (!reason) return null;

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
          <HelpCircle className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Why did we make this update?
        </h3>
      </div>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal pl-1">
        {reason}
      </p>
    </section>
  );
}
