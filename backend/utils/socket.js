let ioInstance = null;

/**
 * Initialize Socket.io instance with HTTP Server
 */
const initSocket = (server, allowedOrigins) => {
  const { Server } = require('socket.io');
  ioInstance = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (
          allowedOrigins.includes(origin) ||
          /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
        ) {
          return callback(null, true);
        }
        return callback(null, true);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
    },
    transports: ['polling', 'websocket'],
    pingTimeout: 60000,
    pingInterval: 25000
  });

  ioInstance.on('connection', (socket) => {
    console.log(`[Socket.io] Real-time client connected: ${socket.id}`);

    socket.on('disconnect', (reason) => {
      console.log(`[Socket.io] Real-time client disconnected (${socket.id}): ${reason}`);
    });
  });

  console.log('[Socket.io] Real-time WebSocket engine initialized successfully');
  return ioInstance;
};

const getIO = () => {
  return ioInstance;
};

/**
 * Safely emit socket event to all connected clients
 */
const emitSocketEvent = (event, payload) => {
  if (ioInstance) {
    ioInstance.emit(event, payload);
  }
};

module.exports = {
  initSocket,
  getIO,
  emitSocketEvent
};
