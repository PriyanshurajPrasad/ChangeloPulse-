import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ChatbotFloatingButton from './ChatbotFloatingButton';
import ChatbotWindow from './ChatbotWindow';

export default function ChatbotWidget() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  // STRICT SECURITY BOUNDARY & USER ROLE CHECK (PART 1, 23 & 24)
  // Render ONLY for authenticated users with role === 'user' on non-admin routes
  if (
    !isAuthenticated ||
    !user ||
    user.role !== 'user' ||
    location.pathname.startsWith('/admin')
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-auto">
      <ChatbotWindow />
      <ChatbotFloatingButton />
    </div>
  );
}
