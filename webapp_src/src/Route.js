import { useAuth } from './contexts/AuthContext';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AppointmentPage from './pages/AppointmentPage';

import ReceptionistDashboard from './pages/ReceptionistDashboard';
import ReceptionistAppointmentPage from './pages/ReceptionistAppointmentPage';

import RequireAuth from './components/RequireAuthComponent';
import RequireReceptionClaim from './components/RequireReceptionClaim';
import { Routes, Route } from 'react-router-dom';


const RoutesConfig = () => {
  const { currentUser, receptionist } = useAuth();
  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      {currentUser && !receptionist ? (
        <>
          <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
          <Route path="/profile" element={ <RequireAuth><ProfilePage /></RequireAuth>} />
          <Route path="/appointments" element={ <RequireAuth><AppointmentPage /></RequireAuth>} />
        </>
      ): <></>}

      {currentUser && receptionist ? (
        <>
          <Route path="/dashboard" element={<RequireReceptionClaim><ReceptionistDashboard /></RequireReceptionClaim>} />
          <Route path="/appointments" element={<RequireReceptionClaim><ReceptionistAppointmentPage /></RequireReceptionClaim>} />
        </>
      ): <></>}
    </Routes>
  );
};


export default RoutesConfig;