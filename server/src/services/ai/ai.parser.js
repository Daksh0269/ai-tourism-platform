const parseAndValidateJson = (rawString, requiredKeys = []) => {
  try {
    // 1. Strip markdown code fences if the AI ignores strict JSON instructions
    let cleanString = rawString.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    // 2. Parse to JS Object
    const parsedObject = JSON.parse(cleanString);

    // 3. Validate required schema keys exist
    for (const key of requiredKeys) {
      if (parsedObject[key] === undefined) {
        throw new Error(`Missing required key in AI response: "${key}"`);
      }
    }

    return parsedObject;
  } catch (error) {
    console.error('[AI Parser Error] Raw string received:', rawString);
    throw new Error(`AI Output Validation Failed: ${error.message}`);
  }
};

module.exports = { parseAndValidateJson };