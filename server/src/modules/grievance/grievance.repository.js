const dbService = require('../../services/appwrite/database.service');
const { Query } = require('../../services/appwrite/appwrite.client');

const COLLECTION_ID = 'grievances';

class GrievanceRepository {
  async create(data) {
    return await dbService.createDocument(COLLECTION_ID, data);
  }

  async getById(id) {
    return await dbService.getDocument(COLLECTION_ID, id);
  }

  async listByLocation(location, limit = 20) {
    const queries = [
      Query.equal('location', location),
      Query.orderDesc('$createdAt'),
      Query.limit(limit)
    ];
    return await dbService.listDocuments(COLLECTION_ID, queries);
  }

  async list(filters = {}) {
    const queries = [];
    if (filters.status) queries.push(Query.equal('status', filters.status));
    if (filters.category) queries.push(Query.equal('category', filters.category));
    if (filters.userId) queries.push(Query.equal('userId', filters.userId));
    queries.push(Query.orderDesc('$createdAt'));
    queries.push(Query.limit(filters.limit || 50));

    return await dbService.listDocuments(COLLECTION_ID, queries);
  }
}

module.exports = new GrievanceRepository();