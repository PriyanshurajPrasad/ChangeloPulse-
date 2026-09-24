import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { useChatbot } from '../../context/ChatbotContext';

export default function ChatMessageList() {
  const { messages, loading } = useChatbot();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0 custom-scrollbar">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}

      {loading && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
}
