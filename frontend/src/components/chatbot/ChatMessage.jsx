import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ChatMessage({ message }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAssistant = message.sender === 'assistant';

  const handleActionClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const formatTime = (ts) => {
    if (!ts) return '';
    const date = new Date(ts);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`flex items-start gap-2.5 max-w-[88%] ${
        isAssistant ? 'self-start' : 'self-end flex-row-reverse'
      } animate-fade-in`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-sm ${
          isAssistant
            ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white'
            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
        }`}
      >
        {isAssistant ? (
          <Bot className="w-4 h-4" />
        ) : (
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt="User"
            className="w-7 h-7 rounded-xl object-cover ring-1 ring-slate-300 dark:ring-slate-700"
          />
        )}
      </div>

      {/* Message Content Bubble */}
      <div className="space-y-1.5 min-w-0">
        <div
          className={`px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
            isAssistant
              ? message.isError
                ? 'bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 rounded-tl-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs'
              : 'bg-indigo-600 text-white font-medium rounded-tr-xs'
          }`}
        >
          {isAssistant ? (
            <div className="prose prose-xs dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-h3:text-xs prose-h3:font-bold prose-h3:mt-2 prose-h3:mb-1">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
            </div>
          ) : (
            <p className="whitespace-pre-wrap break-words">{message.text}</p>
          )}
        </div>

        {/* Actionable Interactive Buttons */}
        {isAssistant && message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {message.actions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleActionClick(action.path)}
                className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition flex items-center gap-1.5 shadow-2xs group"
              >
                <span>{action.label}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        {message.timestamp && (
          <p
            className={`text-[10px] text-slate-400 dark:text-slate-500 font-medium px-1 ${
              isAssistant ? 'text-left' : 'text-right'
            }`}
          >
            {formatTime(message.timestamp)}
          </p>
        )}
      </div>
    </div>
  );
}
