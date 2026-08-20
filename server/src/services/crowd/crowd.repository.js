const dbService = require('../../services/appwrite/database.service');
const { Query, ID } = require('../../services/appwrite/appwrite.client');

const SNAPSHOTS_COLLECTION = 'crowd_snapshots';
const FORECASTS_COLLECTION = 'crowd_forecasts';

class CrowdRepository {
  async saveSnapshot(data) {
    return await dbService.createDocument(SNAPSHOTS_COLLECTION, data);
  }

  async getLatestSnapshot(attractionId) {
    const queries = [
      Query.equal('attractionId', attractionId),
      Query.orderDesc('recordedAt'),
      Query.limit(1)
    ];
    const result = await dbService.listDocuments(SNAPSHOTS_COLLECTION, queries);
    return result.documents[0] || null;
  }
  
  // Forecast functions would go here
}

module.exports = new CrowdRepository();