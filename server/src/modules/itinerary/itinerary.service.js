const itineraryRepository = require('./itinerary.repository');
const tourismRepository = require('../tourism/tourism.repository');
const itineraryEngine = require('./itinerary.engine');

class ItineraryService {
  async generate({ userId, title, location, maxBudget, availableTimeMinutes, preferredCategories }) {
    // 1. Fetch available attractions for the target location
    const attractionsResult = await tourismRepository.list({ location, limit: 100 });
    const attractions = attractionsResult.documents || [];

    if (attractions.length === 0) {
      throw new Error(`No attractions found for location: ${location}`);
    }

    // 2. Compute sequence deterministically
    const generated = itineraryEngine.generateSequence({
      attractions,
      maxBudget,
      availableTimeMinutes,
      preferredCategories,
    });

    // 3. Create parent Itinerary record
    const itinerary = await itineraryRepository.createItinerary({
      userId,
      title: title || `Trip to ${location}`,
      location,
      currentVersion: 1,
      status: 'active',
    });

    // 4. Save Version 1 record
    const initialVersion = await itineraryRepository.createVersion({
      itineraryId: itinerary.$id,
      versionNumber: 1,
      stops: JSON.stringify(generated.stops),
      changeReason: 'INITIAL_GENERATION',
      totalCost: generated.totalCost,
      totalDuration: generated.totalDuration,
    });

    return {
      ...itinerary,
      version: {
        ...initialVersion,
        stops: generated.stops,
      },
    };
  }

  async getById(itineraryId, versionNumber = null) {
    const itinerary = await itineraryRepository.getItineraryById(itineraryId);
    
    const version = versionNumber
      ? await itineraryRepository.getSpecificVersion(itineraryId, versionNumber)
      : await itineraryRepository.getSpecificVersion(itineraryId, itinerary.currentVersion);

    if (!version) {
      throw new Error('Version details not found for this itinerary');
    }

    return {
      ...itinerary,
      currentVersionData: {
        ...version,
        stops: JSON.parse(version.stops),
      },
    };
  }

  async createNewVersion(itineraryId, { stops, changeReason, totalCost, totalDuration }) {
    const itinerary = await itineraryRepository.getItineraryById(itineraryId);
    const nextVersionNumber = itinerary.currentVersion + 1;

    // 1. Create a new version record without overwriting previous versions
    const newVersion = await itineraryRepository.createVersion({
      itineraryId,
      versionNumber: nextVersionNumber,
      stops: JSON.stringify(stops),
      changeReason: changeReason || 'MANUAL_MODIFICATION',
      totalCost: Number(totalCost),
      totalDuration: Number(totalDuration),
    });

    // 2. Increment pointer on parent record
    await itineraryRepository.updateItinerary(itineraryId, {
      currentVersion: nextVersionNumber,
    });

    return {
      itineraryId,
      versionNumber: nextVersionNumber,
      changeReason: newVersion.changeReason,
      stops,
      totalCost: newVersion.totalCost,
      totalDuration: newVersion.totalDuration,
    };
  }
}

module.exports = new ItineraryService();