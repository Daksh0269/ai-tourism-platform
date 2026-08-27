import { useState, useEffect } from 'react';
import { account, getSessionToken } from '../lib/appwrite';
import { connectSocket, disconnectSocket } from '../lib/socket';
import { ID } from 'appwrite';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function TestHarness() {
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
    const res = await fetchApi('/tourism/seed', 'POST');
    if (res?.data && res.data.length > 0) {
      setSpikeId(res.data[0].$id);
      setSpikeName(res.data[0].name);
      addLog('Seed complete. Crowd Spike inputs auto-filled.');
    }
  };

  const findAttractions = async () => {
    const res = await fetchApi(`/tourism?location=${itinLoc}`, 'GET');
    if (res?.data?.length === 0) addLog(`No attractions found in ${itinLoc}.`);
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
        <h1 className="text-2xl font-bold mb-4">🛠️ Feature Test Harness</h1>

        {alerts.length > 0 && (
          <div style={{ padding: '15px', background: '#ff4444', color: 'white', marginBottom: '20px', borderRadius: '8px' }}>
            <h3 className="font-bold">🚨 Live Alerts (WebSockets)</h3>
            <ul className="list-disc pl-4">{alerts.map((a, i) => <li key={i}>{a}</li>)}</ul>
            <button onClick={() => setAlerts([])} className="mt-2 bg-white text-red-500 px-2 py-1 rounded text-sm">Clear</button>
          </div>
        )}

        {/* AUTH */}
        <div style={{ padding: '15px', border: '1px solid #ccc', marginBottom: '15px', borderRadius: '5px' }}>
          <h3 className="font-bold mb-2">1. Auth & Setup</h3>
          {!user ? (
            <div className="flex gap-2 flex-wrap">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border px-2 py-1 rounded" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border px-2 py-1 rounded" />
              <button onClick={handleLogin} className="bg-blue-500 text-white px-3 py-1 rounded">Login</button>
              <button onClick={handleRegister} className="bg-gray-200 px-3 py-1 rounded">Register</button>
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap items-center">
              <p className="text-sm">Logged in as: <strong>{user.email}</strong></p>
              <button onClick={handleLogout} className="bg-red-500 text-white px-2 py-1 rounded text-sm">Logout</button>
              <button onClick={upgradeToAdmin} className="bg-gray-800 text-white px-2 py-1 rounded text-sm">Upgrade Admin</button>
              <button onClick={seedAttraction} className="bg-green-600 text-white px-2 py-1 rounded text-sm">Seed Attractions</button>
            </div>
          )}
        </div>

        {/* GRIEVANCE */}
        <div style={{ padding: '15px', border: '1px solid #ccc', marginBottom: '15px', borderRadius: '5px' }}>
          <h3 className="font-bold mb-2">2. AI Grievance Triage</h3>
          <input type="text" value={grievanceLoc} onChange={e => setGrievanceLoc(e.target.value)} placeholder="Location" className="w-full border px-2 py-1 rounded mb-2" />
          <textarea value={grievanceText} onChange={e => setGrievanceText(e.target.value)} rows="2" className="w-full border px-2 py-1 rounded mb-2" />
          <button onClick={submitGrievance} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Submit Grievance</button>
        </div>

        {/* ITINERARY */}
        <div style={{ padding: '15px', border: '1px solid #ccc', marginBottom: '15px', borderRadius: '5px' }}>
          <h3 className="font-bold mb-2">3. Itinerary Generator</h3>
          <div className="flex gap-2 mb-2">
            <input type="text" value={itinLoc} onChange={e => setItinLoc(e.target.value)} placeholder="Target Location" className="border px-2 py-1 rounded w-full" />
          </div>
          <div className="flex gap-2">
            <button onClick={findAttractions} className="bg-gray-200 px-3 py-1 rounded text-sm">Find Attractions</button>
            <button onClick={generateItinerary} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Generate Itinerary</button>
          </div>
        </div>

        {/* CROWD SPIKE */}
        <div style={{ padding: '15px', border: '1px solid #ccc', marginBottom: '15px', borderRadius: '5px' }}>
          <h3 className="font-bold mb-2">4. Trigger Crowd Spike</h3>
          <input type="text" value={spikeId} onChange={e => setSpikeId(e.target.value)} placeholder="Attraction ID" className="w-full border px-2 py-1 rounded mb-2 text-sm" />
          <input type="text" value={spikeName} onChange={e => setSpikeName(e.target.value)} placeholder="Attraction Name" className="w-full border px-2 py-1 rounded mb-2 text-sm" />
          <button onClick={triggerSpike} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Simulate Spike</button>
        </div>

      </div>

      {/* RIGHT COLUMN: LOGS */}
      <div style={{ flex: 1, padding: '15px', background: '#1e1e1e', color: '#00ff00', borderRadius: '8px', overflowY: 'auto', maxHeight: '85vh' }}>
        <h3 className="font-bold mb-2 text-white">Terminal Logs</h3>
        {logs.map((log, i) => (
          <div key={i} style={{ marginBottom: '10px', fontSize: '12px', borderBottom: '1px solid #333', paddingBottom: '4px', wordWrap: 'break-word' }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}