const express = require('express');
const router = express.Router();
const grievanceController = require('./grievance.controller');
const { validateGrievanceSubmission } = require('./grievance.validation');
const { requireAuth, requireRole } = require('../../middleware/auth.middleware');

// User routes (require JWT auth)
router.post('/submit', requireAuth, validateGrievanceSubmission, grievanceController.submit);
router.get('/', requireAuth, grievanceController.list);
router.get('/:id', requireAuth, grievanceController.get);

// Admin/Officer routes
router.patch('/:id/status', requireAuth, requireRole(['admin', 'department_officer']), grievanceController.updateStatus);

module.exports = router;