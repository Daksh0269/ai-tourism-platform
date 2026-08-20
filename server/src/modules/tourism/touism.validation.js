const validateAttraction = (req, res, next) => {
  const { name, description, location, lat, lng, categories, averageVisitDuration, entryFee, status } = req.body;
  
  if (!name || !description || !location || lat === undefined || lng === undefined || !categories || !averageVisitDuration || entryFee === undefined || !status) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields: name, description, location, lat, lng, categories, averageVisitDuration, entryFee, status' 
    });
  }
  
  if (!Array.isArray(categories)) {
    return res.status(400).json({ success: false, message: 'Categories must be an array' });
  }

  next();
};

module.exports = { validateAttraction };