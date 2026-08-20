const itineraryService = require('./itinerary.service');

class ItineraryController {
  async generate(req, res, next) {
    try {
      const { title, location, maxBudget, availableTimeMinutes, preferredCategories } = req.body;
      
      if (!location) {
        return res.status(400).json({ success: false, message: 'Location is required' });
      }

      const result = await itineraryService.generate({
        userId: req.user.id,
        title,
        location,
        maxBudget,
        availableTimeMinutes,
        preferredCategories,
      });

      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const { id } = req.params;
      const { version } = req.query;
      const itinerary = await itineraryService.getById(id, version);
      res.status(200).json({ success: true, data: itinerary });
    } catch (error) {
      next(error);
    }
  }

  async patchVersion(req, res, next) {
    try {
      const { id } = req.params;
      const { stops, changeReason, totalCost, totalDuration } = req.body;

      if (!stops || !Array.isArray(stops)) {
        return res.status(400).json({ success: false, message: 'Valid stops array is required to version an itinerary' });
      }

      const newVersion = await itineraryService.createNewVersion(id, {
        stops,
        changeReason,
        totalCost,
        totalDuration,
      });

      res.status(200).json({ success: true, data: newVersion });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ItineraryController();