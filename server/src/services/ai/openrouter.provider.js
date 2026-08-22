const env = require('../../config/env');

const generateJson = async (prompt, systemInstruction) => {
  if (!env.ai.openRouterKey) throw new Error("OpenRouter API key is not configured.");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.ai.openRouterKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Llama 3 8B is typically free and very fast on OpenRouter
      model: "google/gemma-2-9b-it:free",
      messages: [
        { 
          role: "system", 
          content: systemInstruction + "\n\nCRITICAL INSTRUCTION: You must respond ONLY in valid JSON format. Do not include markdown blocks, text prefixes, or explanations." 
        },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter Error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

module.exports = { generateJson };