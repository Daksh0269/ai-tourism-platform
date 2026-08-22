const dbService = require('../../services/appwrite/database.service');
const { Query } = require('../../services/appwrite/appwrite.client');

const ITINERARIES_COLLECTION = 'itineraries';
const VERSIONS_COLLECTION = 'itinerary_versions';

class ItineraryRepository {
  async createItinerary(data) {
    return await dbService.createDocument(ITINERARIES_COLLECTION, data);
  }

  async getItineraryById(id) {
    return await dbService.getDocument(ITINERARIES_COLLECTION, id);
  }

  async updateItinerary(id, data) {
    return await dbService.updateDocument(ITINERARIES_COLLECTION, id, data);
  }

  async createVersion(versionData) {
    return await dbService.createDocument(VERSIONS_COLLECTION, versionData);
  }

  async getVersionsByItineraryId(itineraryId) {
    const queries = [
      Query.equal('itineraryId', itineraryId),
      Query.orderDesc('versionNumber')
    ];
    return await dbService.listDocuments(VERSIONS_COLLECTION, queries);
  }

  async getSpecificVersion(itineraryId, versionNumber) {
    const queries = [
      Query.equal('itineraryId', itineraryId),
      Query.equal('versionNumber', Number(versionNumber)),
      Query.limit(1)
    ];
    const result = await dbService.listDocuments(VERSIONS_COLLECTION, queries);
    return result.documents[0] || null;
  }
}
module.exports = new TourismRepository();