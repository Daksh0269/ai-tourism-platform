const crowdService = require('./crowd.service');

class CrowdController {
  async getCurrentCrowd(req, res, next) {
    try {
      const { attractionId } = req.params;
      const crowdData = await crowdService.getAttractionCrowd(attractionId);
      
      res.status(200).json({ success: true, data: crowdData });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CrowdController();