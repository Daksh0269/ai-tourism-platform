import { Client, Account } from 'appwrite';

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);

export const getSessionToken = async () => {
  try {
    const jwtResponse = await account.createJWT();
    return jwtResponse.jwt;
  } catch (error) {
    console.error("No active session", error);
    return null;
  }
};