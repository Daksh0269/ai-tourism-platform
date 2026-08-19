const { databases, ID } = require('./appwrite.client');
const AppwriteError = require('../../utils/AppwriteError');
const env = require('../../config/env');

const dbId = env.appwrite.databaseId;

const handleAppwriteError = (error, contextMessage) => {
  console.error(`[Appwrite DB Error] ${contextMessage}:`, error.message);
  throw new AppwriteError(error.message, error.code);
};

const createDocument = async (collectionId, data, documentId = ID.unique()) => {
  try {
    return await databases.createDocument(dbId, collectionId, documentId, data);
  } catch (error) {
    handleAppwriteError(error, `Failed to create in ${collectionId}`);
  }
};

const getDocument = async (collectionId, documentId) => {
  try {
    return await databases.getDocument(dbId, collectionId, documentId);
  } catch (error) {
    handleAppwriteError(error, `Failed to get ${documentId} from ${collectionId}`);
  }
};

const listDocuments = async (collectionId, queries = []) => {
  try {
    return await databases.listDocuments(dbId, collectionId, queries);
  } catch (error) {
    handleAppwriteError(error, `Failed to list from ${collectionId}`);
  }
};

const updateDocument = async (collectionId, documentId, data) => {
  try {
    return await databases.updateDocument(dbId, collectionId, documentId, data);
  } catch (error) {
    handleAppwriteError(error, `Failed to update ${documentId} in ${collectionId}`);
  }
};

const deleteDocument = async (collectionId, documentId) => {
  try {
    return await databases.deleteDocument(dbId, collectionId, documentId);
  } catch (error) {
    handleAppwriteError(error, `Failed to delete ${documentId} from ${collectionId}`);
  }
};

module.exports = {
  createDocument,
  getDocument,
  listDocuments,
  updateDocument,
  deleteDocument
};