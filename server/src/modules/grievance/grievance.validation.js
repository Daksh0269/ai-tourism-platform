const validateGrievanceSubmission = (req, res, next) => {
  const { text, location } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length < 5) {
    return res.status(400).json({
      success: false,
      message: 'A valid text description (minimum 5 characters) is required.'
    });
  }

  if (!location || typeof location !== 'string' || location.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Location is required.'
    });
  }

  next();
};

module.exports = { validateGrievanceSubmission };