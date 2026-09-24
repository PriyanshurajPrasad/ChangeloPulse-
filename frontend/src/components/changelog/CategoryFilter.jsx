import React from 'react';
import { Layers } from 'lucide-react';

const CATEGORIES = [
  { id: '', label: 'All Updates' },
  { id: 'feature', label: 'Features' },
  { id: 'improvement', label: 'Improvements' },
  { id: 'bug-fix', label: 'Bug Fixes' },
  { id: 'announcement', label: 'Announcements' },
  { id: 'release', label: 'Releases' }
];

export default function CategoryFilter({ selectedCategory, onChange }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const active = selectedCategory === cat.id;
        return (
          <button
            key={cat.id || 'all'}
            onClick={() => onChange(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition duration-200 ${
              active
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
