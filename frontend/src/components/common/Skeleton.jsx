import React from 'react';

export function UpdateCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 animate-pulse space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-md" />
      </div>
      <div className="h-7 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
      <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
        <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm animate-pulse">
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex justify-between">
        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse py-8">
      <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      <div className="flex items-center gap-4">
        <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
      <div className="h-64 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      <div className="space-y-3 pt-4">
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );
}
