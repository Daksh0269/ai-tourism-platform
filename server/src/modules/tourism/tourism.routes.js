const express = require('express');
const router = express.Router();
const tourismController = require('./tourism.controller');
const { validateAttraction } = require('./tourism.validation');
const { requireAuth, requireRole } = require('../../middleware/auth.middleware');

// Public routes (Tourists can view/search attractions)
router.get('/', tourismController.list);
router.get('/:id', tourismController.get);

// Protected routes (Only admins or authorized officers can add attractions)
// We use the middleware we built in Phase 3
router.post('/', requireAuth, requireRole(['admin', 'department_officer']), validateAttraction, tourismController.create);

module.exports = router;