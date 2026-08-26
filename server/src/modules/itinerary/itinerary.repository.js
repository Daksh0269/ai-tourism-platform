const dbService = require('../../services/appwrite/database.service');
const { Query } = require('../../services/appwrite/appwrite.client');

const ITINERARIES_COLLECTION = 'itineraries';
const VERSIONS_COLLECTION = 'itinerary_versions';

class ItineraryRepository {
  async createItinerary(data) {
    return await dbService.createDocument(ITINERARIES_COLLECTION, data);
  }

  async createVersion(data) {
    return await dbService.createDocument(VERSIONS_COLLECTION, data);
  }

  async getItineraryById(id) {
    return await dbService.getDocument(ITINERARIES_COLLECTION, id);
  }

  async getSpecificVersion(itineraryId, versionNumber) {
    const queries = [
      Query.equal('itineraryId', itineraryId),
      Query.equal('versionNumber', versionNumber),
      Query.limit(1)
    ];
    const result = await dbService.listDocuments(VERSIONS_COLLECTION, queries);
    return result.documents[0] || null;
  }

  async updateItinerary(id, data) {
    return await dbService.updateDocument(ITINERARIES_COLLECTION, id, data);
  }

  // Added for Phase 9: Realtime Crowd Spike Handling
  async getActiveItineraries() {
    const queries = [Query.equal('status', 'active')];
    return await dbService.listDocuments(ITINERARIES_COLLECTION, queries);
  }
}

module.exports = new ItineraryRepository();