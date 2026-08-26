const grievanceService = require('./grievance.service');

class GrievanceController {
  async submit(req, res, next) {
    try {
      const { text, location } = req.body;
      const result = await grievanceService.submitGrievance({
        userId: req.user.id,
        text,
        location
      });
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async list(req, res, next) {
    try {
      const filters = {
        status: req.query.status,
        category: req.query.category,
        userId: req.query.myGrievances ? req.user.id : undefined,
        limit: req.query.limit ? parseInt(req.query.limit) : 50
      };
      const result = await grievanceService.getGrievances(filters);
      res.status(200).json({ success: true, data: result.documents, total: result.total });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const grievance = await grievanceService.getGrievanceById(req.params.id);
      res.status(200).json({ success: true, data: grievance });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GrievanceController();