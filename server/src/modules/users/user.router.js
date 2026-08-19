const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const { requireAuth } = require('../../middleware/auth.middleware');

router.get('/me', requireAuth, userController.getMe);
router.patch('/role', requireAuth, userController.updateRole);

module.exports = router;