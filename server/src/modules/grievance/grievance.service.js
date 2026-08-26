const grievanceRepository = require('./grievance.repository');

class GrievanceService {
  async submitGrievance({ userId, text, location }) {
    const grievancePayload = {
      userId,
      text: text.trim(),
      location: location.trim(),
      status: 'submitted'
    };

    return await grievanceRepository.create(grievancePayload);
  }

  async getGrievances(filters) {
    return await grievanceRepository.list(filters);
  }

  async getGrievanceById(id) {
    return await grievanceRepository.getById(id);
  }

  async updateGrievanceStatus(id, status) {
    const validStatuses = ['submitted', 'in_review', 'resolved', 'rejected'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    return await grievanceRepository.updateStatus(id, status);
  }
}

module.exports = new GrievanceService();