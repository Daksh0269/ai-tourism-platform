const tourismService = require('./tourism.service');

class TourismController {
  async create(req, res, next) {
    try {
      const attraction = await tourismService.createAttraction(req.body);
      res.status(201).json({ success: true, data: attraction });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const attraction = await tourismService.getAttraction(req.params.id);
      res.status(200).json({ success: true, data: attraction });
    } catch (error) {
      next(error);
    }
  }

  async list(req, res, next) {
    try {
      const attractions = await tourismService.filterAttractions(req.query);
      res.status(200).json({ success: true, data: attractions.documents, total: attractions.total });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TourismController();