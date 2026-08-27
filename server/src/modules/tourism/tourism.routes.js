const express = require('express');
const router = express.Router();
const tourismController = require('./tourism.controller');
const { validateAttraction } = require('./tourism.validation');
const { requireAuth, requireRole } = require('../../middleware/auth.middleware');

router.get('/', tourismController.list);

// MUST BE ABOVE /:id
router.post('/seed', requireAuth, requireRole(['admin', 'department_officer']), tourismController.seed);

router.get('/:id', tourismController.get);
router.post('/', requireAuth, requireRole(['admin', 'department_officer']), validateAttraction, tourismController.create);

module.exports = router;