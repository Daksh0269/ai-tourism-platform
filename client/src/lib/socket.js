const { Server } = require('socket.io');

let io;
const userSockets = new Map();

const initSockets = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.auth?.userId;
    if (userId) {
      userSockets.set(userId, socket.id);
      console.log(`[Socket] User connected: ${userId} (${socket.id})`);
    }

    socket.on('disconnect', () => {
      if (userId) {
        userSockets.delete(userId);
        console.log(`[Socket] User disconnected: ${userId}`);
      }
    });
  });

  return io;
};

const getIo = () => io;
const getUserSocket = (userId) => userSockets.get(userId);

module.exports = { initSockets, getIo, getUserSocket };