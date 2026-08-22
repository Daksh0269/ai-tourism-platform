const gemini = require('./gemini.provider');
const openrouter = require('./openrouter.provider');
const parser = require('./ai.parser');

class AiService {
  /**
   * Generates structured JSON from the AI.
   * Automatically falls back to OpenRouter if Gemini fails.
   */
  async generateStructuredData({ prompt, systemInstruction, requiredKeys = [] }) {
    let rawOutput;
    let providerUsed = 'gemini';

    try {
      // Primary Attempt: Gemini
      rawOutput = await gemini.generateJson(prompt, systemInstruction);
    } catch (geminiError) {
      console.warn(`[AI Service] Gemini failed: ${geminiError.message}. Falling back to OpenRouter...`);
      
      try {
        // Fallback Attempt: OpenRouter
        providerUsed = 'openrouter';
        rawOutput = await openrouter.generateJson(prompt, systemInstruction);
      } catch (orError) {
        console.error(`[AI Service] OpenRouter also failed: ${orError.message}`);
        throw new Error('All AI providers failed to generate a response.');
      }
    }

    // Strict Parsing & Validation
    const validatedData = parser.parseAndValidateJson(rawOutput, requiredKeys);

    return {
      data: validatedData,
      meta: { provider: providerUsed }
    };
  }
}

module.exports = new AiService();