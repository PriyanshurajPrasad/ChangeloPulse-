import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { chatbotService } from '../services/chatbotService';
import { userAssistantKnowledge } from '../data/userAssistantKnowledge';

const ChatbotContext = createContext(null);

const INITIAL_WELCOME_MESSAGE = {
  id: 'welcome-msg',
  sender: 'assistant',
  text: `Hi! 👋 I'm your **Product Assistant**.

I can help you understand and use the ChangelogPulse User Panel.

What would you like help with?`,
  timestamp: new Date(),
  suggestions: userAssistantKnowledge.initialSuggestions
};

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem('changelogpulse_chat_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse chat messages from sessionStorage', e);
    }
    return [INITIAL_WELCOME_MESSAGE];
  });
  const [loading, setLoading] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // Save conversation state to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('changelogpulse_chat_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed to store chat in sessionStorage', e);
    }
  }, [messages]);

  // Route-specific suggestion chips
  const getSuggestionsForRoute = (path) => {
    if (path.startsWith('/user/changelog/')) {
      return [
        'Explain this update to me',
        'How do I submit feedback?',
        'Where are all updates?',
        'What can I do here?'
      ];
    }
    if (path === '/user/updates') {
      return [
        'How do I search product updates?',
        'What categories exist?',
        'How do I submit feedback?',
        'What are the latest updates?'
      ];
    }
    if (path === '/user/feedback') {
      return [
        'How do I submit new feedback?',
        'What do the status badges mean?',
        'How do I open an update?',
        'Back to Dashboard'
      ];
    }
    if (path === '/user/profile') {
      return [
        'How do I change my avatar?',
        'How do I change my password?',
        'What is my assigned role?',
        'Back to Dashboard'
      ];
    }
    return userAssistantKnowledge.initialSuggestions;
  };

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const nextState = !prev;
      if (nextState) setHasUnreadNotification(false);
      return nextState;
    });
  };

  const closeChat = () => setIsOpen(false);
  const openChat = () => {
    setIsOpen(true);
    setHasUnreadNotification(false);
  };

  const clearChat = () => {
    const freshWelcome = {
      ...INITIAL_WELCOME_MESSAGE,
      id: `welcome-${Date.now()}`,
      timestamp: new Date()
    };
    setMessages([freshWelcome]);
    try {
      sessionStorage.removeItem('changelogpulse_chat_messages');
    } catch (e) {
      // ignore
    }
  };

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await chatbotService.sendMessage(trimmed, {
        route: location.pathname,
        pageTitle: document.title
      });

      if (res && res.data) {
        const assistantMsg = {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: res.data.message,
          actions: res.data.actions || [],
          timestamp: new Date()
        };

        setMessages((prev) => [...prev, assistantMsg]);

        // Auto navigate if assistant response specifies navigation
        if (res.data.autoNavigate) {
          setTimeout(() => {
            navigate(res.data.autoNavigate);
          }, 400);
        }
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      console.error('Chatbot processing error:', err);
      const errorMsg = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Sorry, I couldn’t process that right now. Please try again.',
        isError: true,
        actions: [{ label: 'Try Again', path: null }],
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isOpen,
    toggleOpen,
    closeChat,
    openChat,
    messages,
    loading,
    sendMessage,
    clearChat,
    hasUnreadNotification,
    currentSuggestions: getSuggestionsForRoute(location.pathname),
    quickActions: userAssistantKnowledge.quickActions
  };

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

export default ChatbotContext;
