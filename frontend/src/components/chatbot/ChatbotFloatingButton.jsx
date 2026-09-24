import React from 'react';
import { Bot, Sparkles, X } from 'lucide-react';
import { useChatbot } from '../../context/ChatbotContext';

export default function ChatbotFloatingButton() {
  const { isOpen, toggleOpen, hasUnreadNotification } = useChatbot();

  return (
    <div className="relative group flex justify-end">
      {/* Tooltip on hover */}
      {!isOpen && (
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-100/90 backdrop-blur-md text-white dark:text-slate-900 text-xs font-bold whitespace-nowrap shadow-xl animate-fade-in z-[10000] pointer-events-none">
          <span>Product Assistant</span>
          <div className="w-2 h-2 bg-slate-900/90 dark:bg-slate-100/90 rotate-45 absolute -right-1 top-1/2 -translate-y-1/2" />
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close Product Assistant' : 'Open Product Assistant'}
        className={`relative flex items-center justify-center w-14 h-14 rounded-2xl shadow-2xl transition-all duration-300 transform active:scale-95 z-[9999] ${
          isOpen
            ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rotate-90 shadow-slate-950/40'
            : 'bg-gradient-to-tr from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/40 hover:scale-105 ring-4 ring-indigo-500/10'
        }`}
      >
        {/* Subtle Ambient Glow Ring when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-2xl bg-indigo-500/30 animate-pulse pointer-events-none opacity-75 blur-sm" />
        )}

        {isOpen ? (
          <X className="w-6 h-6 transition-transform" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Bot className="w-7 h-7" />
            <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1.5 -right-1.5 animate-pulse" />
          </div>
        )}

        {/* Small online / active status indicator */}
        {!isOpen && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-slate-900" />
          </span>
        )}
      </button>
    </div>
  );
}
