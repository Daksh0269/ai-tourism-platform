const express = require('express');
const router = express.Router();
const crowdController = require('./crowd.controller');

// Public route: Anyone can check crowd status
router.get('/:attractionId/current', crowdController.getCurrentCrowd);

module.exports = router;