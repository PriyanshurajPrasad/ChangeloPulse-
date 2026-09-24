import React, { useState } from 'react';
import { Bot, Sparkles, X, RotateCcw, MoreVertical, Minus } from 'lucide-react';
import { useChatbot } from '../../context/ChatbotContext';

export default function ChatbotHeader() {
  const { closeChat, clearChat } = useChatbot();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative px-5 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white rounded-t-3xl flex items-center justify-between shadow-md shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative p-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 shadow-inner">
          <Bot className="w-5 h-5 text-white" />
          <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <div>
          <h3 className="text-sm font-extrabold tracking-tight leading-none flex items-center gap-2">
            <span>Product Assistant</span>
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-400/20 text-emerald-300 text-[9px] font-black uppercase tracking-wider border border-emerald-400/30">
              AI
            </span>
          </h3>
          <p className="text-[11px] text-indigo-100/90 font-medium flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Need help using ChangelogPulse?</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setShowOptions(!showOptions)}
          title="Chat Options"
          className="p-1.5 rounded-xl hover:bg-white/10 text-indigo-100 hover:text-white transition"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        <button
          onClick={closeChat}
          title="Minimize Assistant"
          className="p-1.5 rounded-xl hover:bg-white/10 text-indigo-100 hover:text-white transition"
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          onClick={closeChat}
          title="Close Assistant"
          className="p-1.5 rounded-xl hover:bg-white/10 text-indigo-100 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Options Dropdown Menu (Clear conversation) */}
      {showOptions && (
        <div
          className="absolute right-4 top-14 w-48 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 py-1.5 text-xs animate-scale-up"
          onMouseLeave={() => setShowOptions(false)}
        >
          <button
            onClick={() => {
              clearChat();
              setShowOptions(false);
            }}
            className="w-full px-3.5 py-2 text-left font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-rose-600 dark:text-rose-400 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear conversation</span>
          </button>
        </div>
      )}
    </div>
  );
}
