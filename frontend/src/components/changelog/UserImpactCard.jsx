import React from 'react';
import { Info } from 'lucide-react';

export default function UserImpactCard({ impact }) {
  if (!impact) return null;

  return (
    <section className="bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/60 rounded-3xl p-6 sm:p-8 space-y-3">
      <div className="flex items-center gap-2.5">
        <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-extrabold text-indigo-950 dark:text-indigo-100 tracking-tight">
          What does this mean for you?
        </h3>
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium pl-1">
        {impact}
      </p>
    </section>
  );
}
