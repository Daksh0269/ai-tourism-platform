const { getIo, getUserSocket } = require('../sockets/socket');

class NotificationService {
  notifyUser(userId, eventName, payload) {
    const io = getIo();
    const socketId = getUserSocket(userId);

    if (io && socketId) {
      io.to(socketId).emit(eventName, payload);
      console.log(`[Notification] Emitted '${eventName}' to User ${userId}`);
      return true;
    }
    return false;
  }
}

module.exports = new NotificationService();