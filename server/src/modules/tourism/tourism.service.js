const tourismRepository = require('./tourism.repository');

class TourismService {
  async createAttraction(data) {
    // Business logic: Force status to lowercase, etc.
    const attractionData = {
      ...data,
      status: data.status.toLowerCase(),
    };
    return await tourismRepository.create(attractionData);
  }

  async getAttraction(id) {
    return await tourismRepository.getById(id);
  }

  async filterAttractions(queryData) {
    // Clean up query parameters before sending to repository
    const filters = {
      category: queryData.category,
      location: queryData.location,
      tag: queryData.tag,
      limit: queryData.limit ? parseInt(queryData.limit) : 50
    };
    return await tourismRepository.list(filters);
  }
}

module.exports = new TourismService();