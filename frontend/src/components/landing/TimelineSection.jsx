import React from 'react';
import { Calendar, Sparkles, Tag } from 'lucide-react';
import CategoryBadge from '../common/CategoryBadge';

const MILESTONES = [
  {
    date: 'Sep 2026',
    title: 'Security & Two-Factor Infrastructure Upgrade',
    category: 'announcement',
    version: 'v2.3.3',
    desc: 'Upgraded password hashing algorithms, added IP rate-limiting, and Helmet security headers.'
  },
  {
    date: 'Aug 2026',
    title: 'Analytics Dashboard Export Center',
    category: 'feature',
    version: 'v2.3.2',
    desc: 'Export report dataset views directly into CSV, PDF, and raw JSON payload formats.'
  },
  {
    date: 'Jul 2026',
    title: 'Mobile Touch Navigation Overhaul',
    category: 'improvement',
    version: 'v2.3.1',
    desc: 'Redesigned mobile touch targets, swipeable card views, and bottom navigation bar.'
  },
  {
    date: 'Jun 2026',
    title: 'AI Dashboard & Anomaly Detection',
    category: 'release',
    version: 'v2.2.0',
    desc: 'Automated predictive insights and natural language query processing engine.'
  }
];

export default function TimelineSection() {
  return (
    <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Product Roadmap</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Release Milestone Timeline
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base">
          Track continuous product velocity release after release.
        </p>
      </div>

      <div className="relative border-l-2 border-indigo-500/30 dark:border-indigo-500/20 ml-4 sm:ml-32 space-y-8 pl-6">
        {MILESTONES.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-indigo-600 border-4 border-slate-50 dark:border-slate-950 group-hover:scale-125 transition duration-200" />

            {/* Date label */}
            <span className="sm:absolute sm:-left-36 sm:top-1.5 text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 mb-1 block">
              {item.date}
            </span>

            {/* Content card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm group-hover:shadow-md transition duration-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CategoryBadge category={item.category} size="xs" />
                <span className="text-xs font-mono font-bold text-slate-500">{item.version}</span>
              </div>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
