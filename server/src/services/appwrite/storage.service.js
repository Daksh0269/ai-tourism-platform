const { storage, ID } = require('./appwrite.client');
const AppwriteError = require('../../utils/AppwriteError');

const uploadFile = async (bucketId, file, fileId = ID.unique()) => {
  try {
    return await storage.createFile(bucketId, fileId, file);
  } catch (error) {
    throw new AppwriteError(error.message, error.code);
  }
};

const deleteFile = async (bucketId, fileId) => {
  try {
    return await storage.deleteFile(bucketId, fileId);
  } catch (error) {
    throw new AppwriteError(error.message, error.code);
  }
};

module.exports = {
  uploadFile,
  deleteFile
};