const crowdProvider = require('../../services/crowd/crowd.provider');
const crowdCache = require('../../services/crowd/crowd.cache');
const crowdRepository = require('./crowd.repository');

class CrowdService {
  async getAttractionCrowd(attractionId) {
    // 1. Check valid cache first to save DB/Provider calls
    const cached = crowdCache.get(attractionId);
    if (cached) {
      return { ...cached, source: 'cache' };
    }

    try {
      // 2. Try fetching from live provider (our simulator)
      const liveData = await crowdProvider.fetchLiveDensity(attractionId);
      
      const snapshot = {
        attractionId,
        densityLevel: liveData.densityLevel,
        status: liveData.status,
        recordedAt: new Date().toISOString(),
      };

      // 3. Save to database for historical tracking
      const savedSnapshot = await crowdRepository.saveSnapshot(snapshot);
      
      // 4. Update cache
      crowdCache.set(attractionId, savedSnapshot);

      return { ...savedSnapshot, source: 'live' };
    } catch (error) {
      // Fallback: If live provider fails, get the last known good snapshot from DB
      console.warn(`[CrowdService] Live provider failed for ${attractionId}, falling back to DB.`);
      const lastKnown = await crowdRepository.getLatestSnapshot(attractionId);
      
      if (!lastKnown) {
        throw new Error('No crowd data available for this attraction.');
      }
      return { ...lastKnown, source: 'database_fallback' };
    }
  }
}

module.exports = new CrowdService();