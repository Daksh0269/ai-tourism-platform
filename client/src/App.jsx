import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import TestHarness from './pages/TestHarness';
import Itinerary from './pages/Itinerary';
import Login from './pages/Login';

const Home = () => (
  <div className="h-full flex flex-col items-center justify-center pt-24 text-center">
    <h1 className="text-5xl font-bold tracking-tight mb-6 text-apple-text">
      Discover with Intelligence.
    </h1>
    <p className="text-apple-text-muted max-w-lg text-lg leading-relaxed">
      Real-time crowd routing, dynamic AI itineraries, and instant civic support.
    </p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="itinerary" element={<Itinerary />} />
            <Route path="grievances" element={<div className="p-4">Grievance Portal UI Pending</div>} />
            <Route path="test" element={<TestHarness />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;