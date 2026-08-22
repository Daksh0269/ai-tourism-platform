import { useState, useEffect } from 'react';
import { account, getSessionToken } from './lib/appwrite';
import { ID } from 'appwrite';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState('');
  const [logs, setLogs] = useState([]);

  // Form states
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');

  const addLog = (message, data = null) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${message} ${data ? JSON.stringify(data) : ''}`, ...prev].slice(0, 5));
  };

  // --- AUTH METHODS ---
  const handleRegister = async () => {
    try {
      await account.create(ID.unique(), email, password, 'Test User');
      addLog("Registered successfully. Now logging in...");
      await handleLogin();
    } catch (err) {
      addLog("Register Error", err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      const token = await getSessionToken();
      setUser(user);
      setJwt(token);
      addLog("Logged in!", { name: user.name });
    } catch (err) {
      addLog("Login Error", err.message);
    }
  };

  const handleLogout = async () => {
    await account.deleteSession('current');
    setUser(null);
    setJwt('');
    addLog("Logged out");
  };

  // --- API TEST METHODS ---
  const fetchApi = async (endpoint, method = 'GET', body = null) => {
    try {
      addLog(`Sending ${method} to ${endpoint}...`);
      const headers = { 'Content-Type': 'application/json' };
      if (jwt) headers['Authorization'] = `Bearer ${jwt}`;

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
      });
      const data = await res.json();
      addLog(`Response from ${endpoint}:`, data);
      return data;
    } catch (err) {
      addLog(`Fetch error on ${endpoint}:`, err.message);
    }
  };

  const testAiEndpoint = () => {
    fetchApi('/test-ai', 'POST'); // The Phase 7 test endpoint
  };

  const testGetAttractions = () => {
    fetchApi('/tourism'); // Public endpoint, no JWT strictly needed depending on your routes
  };

  const testGetMe = () => {
    fetchApi('/users/me'); // Requires JWT auth
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🛠️ AI Tourism - Testing Dashboard</h1>
      
      <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
        <h2>1. Authentication</h2>
        {!user ? (
          <div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
          </div>
        ) : (
          <div>
            <p>Logged in as: <strong>{user.email}</strong></p>
            <p style={{fontSize: '12px', wordBreak: 'break-all'}}>JWT: {jwt}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
        <h2>2. Backend Endpoints</h2>
        <button onClick={testAiEndpoint}>Test AI Fallback (/test-ai)</button>
        <button onClick={testGetAttractions}>Fetch Attractions (/tourism)</button>
        <button onClick={testGetMe} disabled={!jwt}>Test Protected Route (/users/me)</button>
      </div>

      <div style={{ padding: '20px', background: '#1e1e1e', color: '#00ff00', height: '300px', overflowY: 'auto' }}>
        <h3>Terminal Logs</h3>
        {logs.map((log, i) => (
          <div key={i} style={{ marginBottom: '8px', fontSize: '14px' }}>{log}</div>
        ))}
      </div>
    </div>
  );
}

export default App;