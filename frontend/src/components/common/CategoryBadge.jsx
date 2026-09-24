import React from 'react';
import { Sparkles, Wrench, Bug, Megaphone, Tag } from 'lucide-react';

const CATEGORY_CONFIG = {
  feature: {
    label: 'Feature',
    icon: Sparkles,
    bg: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
  },
  improvement: {
    label: 'Improvement',
    icon: Wrench,
    bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
  },
  'bug-fix': {
    label: 'Bug Fix',
    icon: Bug,
    bg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
  },
  announcement: {
    label: 'Announcement',
    icon: Megaphone,
    bg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
  },
  release: {
    label: 'Release',
    icon: Tag,
    bg: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
  }
};

export default function CategoryBadge({ category, size = 'sm' }) {
  const config = CATEGORY_CONFIG[category] || {
    label: category,
    icon: Tag,
    bg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
  };

  const Icon = config.icon;
  const sizeClasses = size === 'xs' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ${config.bg} ${sizeClasses} transition-colors`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
}
