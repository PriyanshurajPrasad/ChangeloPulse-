import React from 'react';
import { LayoutDashboard, Sparkles, BookOpen, MessageSquare, User, HelpCircle } from 'lucide-react';
import { useChatbot } from '../../context/ChatbotContext';

export default function QuickActionsBar() {
  const { quickActions, sendMessage, loading } = useChatbot();

  if (!quickActions || quickActions.length === 0) return null;

  const getIcon = (label) => {
    switch (label) {
      case 'Dashboard':
        return <LayoutDashboard className="w-3 h-3 text-indigo-500" />;
      case 'Latest Updates':
        return <Sparkles className="w-3 h-3 text-amber-500" />;
      case 'Changelog':
        return <BookOpen className="w-3 h-3 text-emerald-500" />;
      case 'Feedback':
        return <MessageSquare className="w-3 h-3 text-purple-500" />;
      case 'My Profile':
        return <User className="w-3 h-3 text-blue-500" />;
      default:
        return <HelpCircle className="w-3 h-3 text-slate-400" />;
    }
  };

  return (
    <div className="px-4 py-2 bg-slate-50/90 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
      {quickActions.map((act, idx) => (
        <button
          key={idx}
          disabled={loading}
          onClick={() => sendMessage(act.query)}
          className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-200 text-[11px] font-bold whitespace-nowrap shadow-2xs hover:shadow-xs transition flex items-center gap-1.5 disabled:opacity-50 shrink-0"
        >
          {getIcon(act.label)}
          <span>{act.label}</span>
        </button>
      ))}
    </div>
  );
}
