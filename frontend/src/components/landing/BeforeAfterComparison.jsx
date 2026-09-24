import React from 'react';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function BeforeAfterComparison() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Transform how you communicate release notes
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
          Stop losing feature adoption to unread emails and scattered Slack messages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BEFORE CARD */}
        <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <XCircle className="w-7 h-7 text-rose-600 dark:text-rose-400 shrink-0" />
            <h3 className="text-xl font-extrabold text-rose-900 dark:text-rose-200">
              BEFORE ChangelogPulse
            </h3>
          </div>
          <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
            {[
              'Scattered release notes buried in long email newsletters',
              'Low user awareness of newly shipped features & bug fixes',
              'Manual copy-pasting release notes across multiple channels',
              'No central searchable archive for historical version releases'
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* AFTER CARD */}
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 rounded-3xl p-8 space-y-6 shadow-lg shadow-emerald-500/5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <h3 className="text-xl font-extrabold text-emerald-900 dark:text-emerald-200">
              AFTER ChangelogPulse
            </h3>
          </div>
          <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
            {[
              'Centralized, searchable public changelog feed',
              'Embedded "What\'s New" widget notification right in your app header',
              'Instant draft, publish, and archive administrative lifecycle controls',
              'Index-backed category filtering (Features, Bug Fixes, Improvements)'
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
