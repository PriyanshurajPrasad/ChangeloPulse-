import React from 'react';
import { Sparkles } from 'lucide-react';
import { useChatbot } from '../../context/ChatbotContext';

export default function QuickSuggestionChips() {
  const { currentSuggestions, sendMessage, loading } = useChatbot();

  if (!currentSuggestions || currentSuggestions.length === 0) return null;

  return (
    <div className="px-4 py-2 bg-slate-50/90 dark:bg-slate-900/60 border-t border-slate-200/60 dark:border-slate-800/80 shrink-0">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-1.5">
        <Sparkles className="w-3 h-3 text-indigo-500" />
        <span>Suggestions</span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {currentSuggestions.map((suggestion, idx) => (
          <button
            key={idx}
            disabled={loading}
            onClick={() => sendMessage(suggestion)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-semibold whitespace-nowrap shadow-2xs hover:shadow-xs transition disabled:opacity-50 shrink-0"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
