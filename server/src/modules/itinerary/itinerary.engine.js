class ItineraryEngine {
  /**
   * Deterministic sequence generator based on budget, time window, and category preferences
   */
  generateSequence({ attractions, maxBudget, availableTimeMinutes, preferredCategories = [] }) {
    let remainingBudget = Number(maxBudget) || Infinity;
    let remainingTime = Number(availableTimeMinutes) || 480; // default 8 hours (480 mins)
    const selectedStops = [];

    // Prioritize attractions that match user's preferred categories
    const scoredAttractions = attractions.map((attraction) => {
      const matchCount = attraction.categories.filter((cat) =>
        preferredCategories.includes(cat)
      ).length;
      return { ...attraction, score: matchCount };
    });

    // Sort descending by score, then by lowest entry fee
    scoredAttractions.sort((a, b) => b.score - a.score || a.entryFee - b.entryFee);

    let currentTimeOffset = 0; // minutes from start (e.g. 09:00 AM)

    for (const attraction of scoredAttractions) {
      const visitDuration = attraction.averageVisitDuration || 60;
      const bufferTime = 30; // 30 mins travel/buffer time between stops
      const requiredTime = visitDuration + bufferTime;
      const fee = attraction.entryFee || 0;

      if (remainingTime >= requiredTime && remainingBudget >= fee) {
        selectedStops.push({
          stopOrder: selectedStops.length + 1,
          attractionId: attraction.$id,
          name: attraction.name,
          location: attraction.location,
          coordinates: { lat: attraction.lat, lng: attraction.lng },
          visitDurationMinutes: visitDuration,
          entryFee: fee,
          relativeStartTimeMinutes: currentTimeOffset,
          relativeEndTimeMinutes: currentTimeOffset + visitDuration,
        });

        remainingTime -= requiredTime;
        remainingBudget -= fee;
        currentTimeOffset += requiredTime;
      }
    }

    const totalCost = selectedStops.reduce((acc, stop) => acc + stop.entryFee, 0);
    const totalDuration = currentTimeOffset > 0 ? currentTimeOffset - 30 : 0; // remove trailing buffer

    return {
      stops: selectedStops,
      totalCost,
      totalDuration,
    };
  }
}

module.exports = new ItineraryEngine();