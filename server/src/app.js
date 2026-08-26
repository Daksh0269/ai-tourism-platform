const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Route Imports
const userRoutes = require('./modules/users/user.routes');
const tourismRoutes = require('./modules/tourism/tourism.routes');

const itineraryRoutes = require('./modules/itinerary/itinerary.routes');
const aiService = require('./services/ai/ai.service');
const app = express();
const grievanceRoutes = require('./modules/grievance/grievance.routes');
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root & Health check
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'AI Tourism Platform API',
    version: '1.0.0',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Modular Routes Registration
app.use('/api/v1/users', userRoutes);
// Future phases will mount here:
app.use('/api/v1/tourism', tourismRoutes);
app.use('/api/v1/itineraries', itineraryRoutes);

// app.use('/api/v1/crowd', crowdRoutes);
app.use('/api/v1/grievance', grievanceRoutes);

// Global Error Handler
app.use(errorHandler);
app.post('/api/v1/test-ai', async (req, res, next) => {
  try {
    const result = await aiService.generateStructuredData({
      systemInstruction: "You are an AI assistant. Output JSON with a 'message' and 'confidenceScore' (number 1-10).",
      prompt: "Tell me a short one sentence fact about the city of Raipur.",
      requiredKeys: ['message', 'confidenceScore'] // Strict validation test
    });
    
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
});

module.exports = app;