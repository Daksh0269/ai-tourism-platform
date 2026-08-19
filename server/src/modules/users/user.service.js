const userRepository = require('./user.repository');

class UserService {
  async getCurrentUserProfile(userSessionData) {
    const fullUser = await userRepository.findById(userSessionData.id);
    return {
      id: fullUser.$id,
      name: fullUser.name,
      email: fullUser.email,
      roles: fullUser.prefs?.roles || ['tourist'],
      createdAt: fullUser.$createdAt,
    };
  }

  async assignUserRole(userId, newRole) {
    const validRoles = ['tourist', 'admin', 'department_officer'];
    if (!validRoles.includes(newRole)) {
      throw new Error(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
    }
    return await userRepository.updateRoles(userId, [newRole]);
  }
}

module.exports = new UserService();