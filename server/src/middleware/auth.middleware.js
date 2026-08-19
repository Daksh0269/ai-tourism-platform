const { Client, Account } = require('node-appwrite');
const env = require('../config/env');
const authService = require('../services/appwrite/auth.service');

// Validates the Appwrite session/JWT passed in headers
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authorization token required' });
    }

    const sessionJwt = authHeader.split(' ')[1];

    // Initialize user-scoped client to verify token
    const userClient = new Client()
      .setEndpoint(env.appwrite.endpoint)
      .setProject(env.appwrite.projectId)
      .setJWT(sessionJwt);

    const account = new Account(userClient);
    const user = await account.get();

    // Fetch user preferences/role from server-side admin SDK
    const userDoc = await authService.getUserById(user.$id);

    req.user = {
      id: user.$id,
      email: user.email,
      name: user.name,
      roles: userDoc.prefs?.roles || ['tourist'],
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session', detail: error.message });
  }
};

// Role-based access guard
const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};

module.exports = { requireAuth, requireRole };