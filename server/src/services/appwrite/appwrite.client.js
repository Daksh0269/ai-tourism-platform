const { Client, Databases, Users, Storage, ID, Query } = require('node-appwrite');
const env = require('../../config/env');

const client = new Client()
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId)
  .setKey(env.appwrite.apiKey);

const databases = new Databases(client);
const users = new Users(client);
const storage = new Storage(client);

module.exports = { client, databases, users, storage, ID, Query };