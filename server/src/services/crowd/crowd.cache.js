class CrowdCache {
  constructor() {
    this.cache = new Map();
    this.TTL_MS = 5 * 60 * 1000; // 5 minutes validity
  }

  set(attractionId, snapshot) {
    this.cache.set(attractionId, {
      data: snapshot,
      timestamp: Date.now(),
    });
  }

  get(attractionId) {
    const record = this.cache.get(attractionId);
    if (!record) return null;
    
    // Invalidate if older than TTL
    if (Date.now() - record.timestamp > this.TTL_MS) {
      this.cache.delete(attractionId);
      return null;
    }
    return record.data;
  }
}

module.exports = new CrowdCache();