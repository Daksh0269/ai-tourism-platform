const http = require('http');
const app = require('./src/app');
const env = require('./src/config/env');
const { Server } = require('socket.io');

const server = http.createServer(app);

// Initialize empty Socket.IO server (to be wired in Phase 9)
const io = new Server(server, {
  cors: {
    origin: '*', // To be tightened in production
  }
});

server.listen(env.port, () => {
  console.log(`Server is booting...`);
  console.log(`Listening on port ${env.port}`);
  console.log(`Health check available at http://localhost:${env.port}/health`);
});