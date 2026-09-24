import React, { useEffect } from 'react';
import ChatbotHeader from './ChatbotHeader';
import QuickActionsBar from './QuickActionsBar';
import ChatMessageList from './ChatMessageList';
import QuickSuggestionChips from './QuickSuggestionChips';
import ChatInput from './ChatInput';
import { useChatbot } from '../../context/ChatbotContext';

export default function ChatbotWindow() {
  const { isOpen, closeChat } = useChatbot();

  // Escape key accessibility handler (PART 16)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeChat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeChat]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Product Assistant Chatbot"
      className="absolute bottom-16 right-0 w-[calc(100vw-32px)] sm:w-[400px] h-[550px] sm:h-[600px] max-h-[calc(100vh-110px)] bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl z-[9999] flex flex-col overflow-hidden animate-scale-up ring-1 ring-slate-900/5 dark:ring-white/10"
    >
      {/* Header */}
      <ChatbotHeader />

      {/* Quick Actions Bar */}
      <QuickActionsBar />

      {/* Scrollable Messages Area */}
      <ChatMessageList />

      {/* Contextual Route Suggestions */}
      <QuickSuggestionChips />

      {/* Input Form */}
      <ChatInput />
    </div>
  );
}
