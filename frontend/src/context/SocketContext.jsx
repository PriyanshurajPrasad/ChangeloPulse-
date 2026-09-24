import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState(null);
  const { user, isAdmin, isUser } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    // Derive server base URL from environment or default port 5000
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const serverUrl = apiUrl.replace(/\/api\/?$/, '');

    const newSocket = io(serverUrl, {
      withCredentials: true,
      transports: ['polling', 'websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000
    });

    newSocket.on('connect', () => {
      console.log('[Socket.IO] Connected to server socket ID:', newSocket.id);
      setIsConnected(true);
    });

    newSocket.on('connect_error', (err) => {
      console.warn('[Socket.IO] Connection notice:', err.message || 'Connecting to socket server...');
      setIsConnected(false);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('[Socket.IO] Disconnected from server:', reason);
      setIsConnected(false);
    });

    // Real-time Update Events
    newSocket.on('updateCreated', (data) => {
      setLastEvent({ type: 'updateCreated', data, timestamp: Date.now() });
      if (isUser && data && data.status === 'published') {
        showToast(`🎉 New Product Update: "${data.title}" (${data.version})`, 'info');
      }
    });

    newSocket.on('updatePublished', (data) => {
      setLastEvent({ type: 'updatePublished', data, timestamp: Date.now() });
      if (isUser && data) {
        showToast(`🚀 Update Published: "${data.title}" (${data.version})`, 'info');
      }
    });

    newSocket.on('updateUpdated', (data) => {
      setLastEvent({ type: 'updateUpdated', data, timestamp: Date.now() });
    });

    newSocket.on('updateArchived', (data) => {
      setLastEvent({ type: 'updateArchived', data, timestamp: Date.now() });
    });

    newSocket.on('updateDeleted', (data) => {
      setLastEvent({ type: 'updateDeleted', data, timestamp: Date.now() });
    });

    // Real-time Feedback Events
    newSocket.on('feedbackCreated', (data) => {
      setLastEvent({ type: 'feedbackCreated', data, timestamp: Date.now() });
      if (isAdmin && data) {
        showToast(`📬 New Feedback received from ${data.user?.name || 'a user'}`, 'info');
      }
    });

    newSocket.on('feedbackReplied', (data) => {
      setLastEvent({ type: 'feedbackReplied', data, timestamp: Date.now() });
      if (user && data && data.user && (data.user._id === user._id || data.user === user._id)) {
        showToast(`💬 Admin replied to your feedback on "${data.update?.title || 'update'}"`, 'success');
      }
    });

    newSocket.on('feedbackStatusChanged', (data) => {
      setLastEvent({ type: 'feedbackStatusChanged', data, timestamp: Date.now() });
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user, isAdmin, isUser]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, lastEvent }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export default SocketContext;
