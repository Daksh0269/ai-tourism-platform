import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import TestHarness from './pages/TestHarness';
import Itinerary from './pages/Itinerary';
import Login from './pages/Login';
import Grievances from './pages/Grievances';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="itinerary" element={<Itinerary />} />
            <Route path="grievances" element={<Grievances />} />
            <Route path="test" element={<TestHarness />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;