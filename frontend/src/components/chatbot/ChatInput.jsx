import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChatbot } from '../../context/ChatbotContext';

export default function ChatInput() {
  const { sendMessage, loading, isOpen } = useChatbot();
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!text.trim() || loading) return;
    sendMessage(text);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 rounded-b-3xl shrink-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            maxLength={500}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Ask me anything about the User Panel..."
            aria-label="Ask Product Assistant a question"
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50 pr-9"
          />
          {text.length > 350 && (
            <span className="absolute right-2.5 top-3 text-[10px] font-bold text-slate-400">
              {500 - text.length}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={!text.trim() || loading}
          aria-label="Send Question"
          className="p-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition disabled:opacity-40 disabled:hover:bg-indigo-600 shrink-0"
          title="Send Question"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
