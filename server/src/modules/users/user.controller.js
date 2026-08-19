const userService = require('./user.service');

class UserController {
  async getMe(req, res, next) {
    try {
      const profile = await userService.getCurrentUserProfile(req.user);
      res.status(200).json({ success: true, data: profile });
    } catch (error) {
      next(error);
    }
  }

  async updateRole(req, res, next) {
    try {
      const { role } = req.body;
      const updated = await userService.assignUserRole(req.user.id, role);
      res.status(200).json({ success: true, message: 'Role updated successfully', data: updated });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();