import { io } from 'socket.io-client';

// Extract the base domain from your API URL (removing the /api/v1 part)
const getSocketUrl = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  return apiUrl ? apiUrl.replace('/api/v1', '') : 'http://localhost:5000';
};

let socket = null;

export const connectSocket = (userId) => {
  if (!socket) {
    socket = io(getSocketUrl(), {
      auth: { userId },
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('🟢 Connected to Real-time Server');
    });

    socket.on('disconnect', () => {
      console.log('🔴 Disconnected from Real-time Server');
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;