import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ActionRequiredCard({ actionRequired }) {
  if (!actionRequired) return null;

  const isRequired = actionRequired.required;

  return (
    <div
      className={`p-5 rounded-3xl border flex items-start gap-3.5 transition ${
        isRequired
          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100'
          : 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-100'
      }`}
    >
      {isRequired ? (
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
      )}
      <div className="space-y-1">
        <h4 className="text-sm font-bold">
          {isRequired ? 'Action Required' : 'No Action Required'}
        </h4>
        <p className="text-xs leading-relaxed opacity-90">{actionRequired.message}</p>
      </div>
    </div>
  );
}
