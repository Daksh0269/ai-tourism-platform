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
        location: req.query.location,
        userId: req.query.myGrievances ? req.user.id : undefined,
        limit: req.query.limit ? parseInt(req.query.limit, 10) : 50
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

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await grievanceService.updateGrievanceStatus(id, status);
      res.status(200).json({ success: true, message: 'Status updated successfully', data: updated });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GrievanceController();