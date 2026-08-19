const authService = require('../../services/appwrite/auth.service');

class UserRepository {
  async findById(userId) {
    return await authService.getUserById(userId);
  }

  async updateRoles(userId, roles) {
    return await authService.updateUserPrefs(userId, { roles });
  }
}

module.exports = new UserRepository();