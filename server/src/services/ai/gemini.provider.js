const { GoogleGenerativeAI } = require('@google/generative-ai');
const env = require('../../config/env');

let genAI = null;
if (env.ai.geminiKey) {
  genAI = new GoogleGenerativeAI(env.ai.geminiKey);
}

const generateJson = async (prompt, systemInstruction) => {
  if (!genAI) throw new Error("Gemini API key is not configured.");
  
  // We use gemini-1.5-flash for speed and generous free tier
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // <--- CHANGE THIS LINE
    systemInstruction: systemInstruction,
    generationConfig: { responseMimeType: "application/json" }
  });

  const result = await model.generateContent(prompt);
  return result.response.text(); // Returns stringified JSON
};

module.exports = { generateJson };