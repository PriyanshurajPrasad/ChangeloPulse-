import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';

export default function WhatChangedSection({ changes, label = 'What changed?' }) {
  if (!changes || changes.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          <Layers className="w-5 h-5" />
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {label}
        </h3>
      </div>

      <div className="space-y-4">
        {changes.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">
                {item.id}
              </span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {item.title}
              </h4>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.description}
            </p>

            {item.whyItMatters && (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 shrink-0">Why it matters:</span>
                <span>{item.whyItMatters}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
