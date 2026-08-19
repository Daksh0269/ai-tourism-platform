const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Route Imports
const userRoutes = require('./modules/users/user.routes');

const app = express();

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
// app.use('/api/v1/tourism', tourismRoutes);
// app.use('/api/v1/itineraries', itineraryRoutes);
// app.use('/api/v1/crowd', crowdRoutes);
// app.use('/api/v1/grievance', grievanceRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;