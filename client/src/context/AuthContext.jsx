import { createContext, useContext, useState, useEffect } from 'react';
import { account, getSessionToken } from '../lib/appwrite';
import { ID } from 'appwrite';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const current = await account.get();
      setUser(current);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    await account.createEmailPasswordSession(email, password);
    await checkSession();
  };

  const register = async (email, password, name = 'Tourist') => {
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const getToken = async () => {
    if (!user) return null;
    return await getSessionToken();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, getToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);