const { users } = require('./appwrite.client');
const AppwriteError = require('../../utils/AppwriteError');

const getUserById = async (userId) => {
  try {
    return await users.get(userId);
  } catch (error) {
    throw new AppwriteError(error.message, error.code);
  }
};

// Helpful for storing application roles (e.g. 'admin', 'tourist') securely
const updateUserPrefs = async (userId, prefs) => {
  try {
    return await users.updatePrefs(userId, prefs);
  } catch (error) {
    throw new AppwriteError(error.message, error.code);
  }
};

module.exports = {
  getUserById,
  updateUserPrefs
};