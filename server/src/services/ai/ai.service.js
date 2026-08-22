const groq = require('./groq.provider');
const parser = require('./ai.parser');

class AiService {
  async generateStructuredData({ prompt, systemInstruction, requiredKeys = [] }) {
    try {
      // Fetch raw JSON from Groq
      const rawOutput = await groq.generateJson(prompt, systemInstruction);

      // Strict Parsing & Validation
      const validatedData = parser.parseAndValidateJson(rawOutput, requiredKeys);

      return {
        data: validatedData,
        meta: { provider: 'groq' }
      };
    } catch (error) {
      console.error(`[AI Service] Groq pipeline failed: ${error.message}`);
      throw new Error(`AI processing failed: ${error.message}`);
    }
  }
}

module.exports = new AiService();