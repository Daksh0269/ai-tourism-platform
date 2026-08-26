const express = require('express');
const router = express.Router();
const grievanceController = require('./grievance.controller');
const { validateGrievanceSubmission } = require('./grievance.validation');
const { requireAuth } = require('../../middleware/auth.middleware');

router.post('/submit', requireAuth, validateGrievanceSubmission, grievanceController.submit);
router.get('/', requireAuth, grievanceController.list);
router.get('/:id', requireAuth, grievanceController.get);

module.exports = router;