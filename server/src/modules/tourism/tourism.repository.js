const dbService = require('../../services/appwrite/database.service');
const { Query } = require('../../services/appwrite/appwrite.client');

const COLLECTION_ID = 'attractions';

class TourismRepository {
  async create(data) {
    return await dbService.createDocument(COLLECTION_ID, data);
  }

  async getById(id) {
    return await dbService.getDocument(COLLECTION_ID, id);
  }

  async list(filters = {}) {
    const queries = [];
    
    // Add Appwrite queries based on filters
    if (filters.category) queries.push(Query.contains('categories', filters.category));
    if (filters.location) queries.push(Query.equal('location', filters.location));
    if (filters.tag) queries.push(Query.contains('tags', filters.tag));
    
    // Default limit
    queries.push(Query.limit(filters.limit || 50));
    
    return await dbService.listDocuments(COLLECTION_ID, queries);
  }

  async update(id, data) {
    return await dbService.updateDocument(COLLECTION_ID, id, data);
  }

  async delete(id) {
    return await dbService.deleteDocument(COLLECTION_ID, id);
  }
}

module.exports = new TourismRepository();