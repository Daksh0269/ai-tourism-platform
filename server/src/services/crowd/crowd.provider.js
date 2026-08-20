class CrowdProvider {
  /**
   * Simulates crowd density based on the time of day and a random factor.
   * In a real app, this would call external APIs or hardware sensors.
   */
  async fetchLiveDensity(attractionId) {
    const hour = new Date().getHours();
    let baseDensity = 20;

    // Simulate peak hours (11 AM - 3 PM)
    if (hour >= 11 && hour <= 15) baseDensity = 75;
    else if (hour >= 16 && hour <= 19) baseDensity = 50;

    // Add random variance (+/- 15%)
    const variance = Math.floor(Math.random() * 30) - 15;
    let finalDensity = baseDensity + variance;
    
    // Clamp between 0 and 100
    finalDensity = Math.max(0, Math.min(100, finalDensity));

    let status = 'low';
    if (finalDensity > 40) status = 'moderate';
    if (finalDensity > 75) status = 'high';
    if (finalDensity > 90) status = 'critical';

    return { densityLevel: finalDensity, status };
  }
}

module.exports = new CrowdProvider();