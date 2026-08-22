const dotenv = require('dotenv');
dotenv.config();

// Centralized environment variable validation and export
const env = {
  port: process.env.PORT || 5000,
  appwrite: {
    endpoint: process.env.APPWRITE_ENDPOINT,
    projectId: process.env.APPWRITE_PROJECT_ID,
    apiKey: process.env.APPWRITE_API_KEY,
    databaseId: process.env.APPWRITE_DATABASE_ID,
  },
  ai: {
    geminiKey: process.env.GEMINI_API_KEY,
    openRouterKey: process.env.OPENROUTER_API_KEY,
    groqKey: process.env.GROQ_API_KEY,
  }
};

module.exports = env;