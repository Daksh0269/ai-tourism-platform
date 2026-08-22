const env = require('../../config/env');

const generateJson = async (prompt, systemInstruction) => {
  if (!env.ai.groqKey) throw new Error("Groq API key is not configured.");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.ai.groqKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b", // Blazing fast model on Groq
      response_format: { type: "json_object" }, // Forces valid JSON output
      messages: [
        { 
          role: "system", 
          content: systemInstruction + "\n\nCRITICAL INSTRUCTION: You must respond ONLY in valid JSON format. Do not wrap in markdown." 
        },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq Error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

module.exports = { generateJson };