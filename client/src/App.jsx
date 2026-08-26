import { useState, useEffect } from 'react';
import { account, getSessionToken } from './lib/appwrite';
import { connectSocket, disconnectSocket } from './lib/socket';
import { ID } from 'appwrite';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState('');
  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Form States
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  
  const [grievanceText, setGrievanceText] = useState('The main gate is extremely crowded and dirty.');
  const [grievanceLoc, setGrievanceLoc] = useState('City Museum');

  const [itinLoc, setItinLoc] = useState('Raipur');
  
  const [spikeId, setSpikeId] = useState('');
  const [spikeName, setSpikeName] = useState('City Museum');

  const addLog = (message, data = null) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${message} ${data ? JSON.stringify(data) : ''}`, ...prev].slice(0, 15));
  };

  // --- WEBSOCKETS ---
  useEffect(() => {
    if (user) {
      const socket = connectSocket(user.$id);
      socket.on('itinerary_updated', (data) => {
        addLog('🚨 LIVE ALERT RECEIVED:', data);
        setAlerts(prev => [data.message, ...prev]);
      });
      return () => socket.off('itinerary_updated');
    }
  }, [user]);

  // --- API HELPER ---
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
      addLog(`Response:`, data);
      return data;
    } catch (err) {
      addLog(`Fetch error:`, err.message);
    }
  };

  // --- AUTH ---
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
      const currentUser = await account.get();
      const token = await getSessionToken();
      setUser(currentUser);
      setJwt(token);
      addLog("Logged in!", { name: currentUser.name });
    } catch (err) {
      addLog("Login Error", err.message);
    }
  };

  const handleLogout = async () => {
    await account.deleteSession('current');
    disconnectSocket();
    setUser(null);
    setJwt('');
    addLog("Logged out");
  };

  // --- FEATURE TESTS ---
  const upgradeToAdmin = () => fetchApi('/users/role', 'PATCH', { role: 'admin' });
  
  const seedAttraction = async () => {
    const res = await fetchApi('/tourism', 'POST', {
      name: "City Museum",
      description: "A historical museum.",
      location: itinLoc,
      lat: 21.25, lng: 81.62,
      categories: ["culture", "museum"],
      averageVisitDuration: 120,
      entryFee: 50,
      status: "open"
    });
    if (res?.data?.$id) setSpikeId(res.data.$id); // Auto-fill crowd spike ID
  };

  const submitGrievance = () => fetchApi('/grievance/submit', 'POST', { text: grievanceText, location: grievanceLoc });
  
  const generateItinerary = () => fetchApi('/itineraries/generate', 'POST', {
    title: "Weekend Trip", location: itinLoc, maxBudget: 500, availableTimeMinutes: 480, preferredCategories: ["culture"]
  });

  const triggerSpike = () => fetchApi(`/crowd/${spikeId}/simulate-spike`, 'POST', { attractionName: spikeName });

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '20px' }}>
      
      {/* LEFT COLUMN: CONTROLS */}
      <div style={{ flex: 1 }}>
        <h1>🛠️ Feature Test Harness</h1>

        {alerts.length > 0 && (
          <div style={{ padding: '15px', background: '#ff4444', color: 'white', marginBottom: '20px', borderRadius: '8px' }}>
            <h3>🚨 Live Alerts (WebSockets)</h3>
            <ul>{alerts.map((a, i) => <li key={i}>{a}</li>)}</ul>
            <button onClick={() => setAlerts([])}>Clear</button>
          </div>
        )}

        {/* AUTH */}
        <div style={{ padding: '15px', border: '1px solid #ccc', marginBottom: '15px', borderRadius: '5px' }}>
          <h3>1. Auth & Setup</h3>
          {!user ? (
            <>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleRegister}>Register</button>
            </>
          ) : (
            <>
              <p>Logged in as: <strong>{user.email}</strong></p>
              <button onClick={handleLogout}>Logout</button>
              <button onClick={upgradeToAdmin} style={{ marginLeft: '10px' }}>Upgrade to Admin</button>
              <button onClick={seedAttraction} style={{ marginLeft: '10px', background: '#28a745', color: '#fff' }}>Seed Fake Attraction</button>
            </>
          )}
        </div>

        {/* GRIEVANCE */}
        <div style={{ padding: '15px', border: '1px solid #ccc', marginBottom: '15px', borderRadius: '5px' }}>
          <h3>2. AI Grievance Triage</h3>
          <input type="text" value={grievanceLoc} onChange={e => setGrievanceLoc(e.target.value)} placeholder="Location" style={{ display: 'block', marginBottom: '5px' }} />
          <textarea value={grievanceText} onChange={e => setGrievanceText(e.target.value)} rows="3" style={{ display: 'block', width: '100%', marginBottom: '5px' }} />
          <button onClick={submitGrievance}>Submit Grievance</button>
        </div>

        {/* ITINERARY */}
        <div style={{ padding: '15px', border: '1px solid #ccc', marginBottom: '15px', borderRadius: '5px' }}>
          <h3>3. Itinerary Generator</h3>
          <input type="text" value={itinLoc} onChange={e => setItinLoc(e.target.value)} placeholder="Target Location" style={{ display: 'block', marginBottom: '5px' }} />
          <button onClick={generateItinerary}>Generate Itinerary</button>
        </div>

        {/* CROWD SPIKE */}
        <div style={{ padding: '15px', border: '1px solid #ccc', marginBottom: '15px', borderRadius: '5px' }}>
          <h3>4. Trigger Crowd Spike</h3>
          <p style={{ fontSize: '12px' }}><i>Paste the Attraction ID returned from the Seed or Itinerary steps.</i></p>
          <input type="text" value={spikeId} onChange={e => setSpikeId(e.target.value)} placeholder="Attraction ID" style={{ display: 'block', marginBottom: '5px' }} />
          <input type="text" value={spikeName} onChange={e => setSpikeName(e.target.value)} placeholder="Attraction Name" style={{ display: 'block', marginBottom: '5px' }} />
          <button onClick={triggerSpike} style={{ background: '#dc3545', color: '#fff' }}>Simulate Spike</button>
        </div>

      </div>

      {/* RIGHT COLUMN: LOGS */}
      <div style={{ flex: 1, padding: '15px', background: '#1e1e1e', color: '#00ff00', borderRadius: '8px', overflowY: 'auto', maxHeight: '80vh' }}>
        <h3>Terminal Logs</h3>
        {logs.map((log, i) => (
          <div key={i} style={{ marginBottom: '10px', fontSize: '12px', borderBottom: '1px solid #333', paddingBottom: '4px', wordWrap: 'break-word' }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );  
}
 
export default App;