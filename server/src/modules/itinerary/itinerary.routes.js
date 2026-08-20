const express = require('express');
const router = express.Router();
const itineraryController = require('./itinerary.controller');
const { requireAuth } = require('../../middleware/auth.middleware');

// All itinerary actions require authentication
router.post('/generate', requireAuth, itineraryController.generate);
router.get('/:id', requireAuth, itineraryController.get);
router.patch('/:id', requireAuth, itineraryController.patchVersion);

module.exports = router;