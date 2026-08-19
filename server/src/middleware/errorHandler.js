const AppwriteError = require('../utils/AppwriteError');

const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message);

  if (err instanceof AppwriteError) {
    return res.status(err.code || 500).json({
      success: false,
      error: {
        type: 'AppwriteError',
        message: err.message,
      }
    });
  }

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    error: {
      type: err.name || 'InternalServerError',
      message: err.message || 'An unexpected error occurred.',
    }
  });
};

module.exports = errorHandler;