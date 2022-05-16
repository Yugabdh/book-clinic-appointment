import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { selectUser, selectClaims } from './redux/user';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AppointmentPage from './pages/AppointmentPage';
import NotFoundPage from './pages/NotFoundPage';

import ReceptionistDashboard from './pages/ReceptionistDashboard';
import ReceptionistAppointmentPage from './pages/ReceptionistAppointmentPage';

import DoctorDashboardPage from './pages/DoctorDashboardPage';

import RequireAuth from './components/RequireAuthComponent';
import RequireReceptionClaim from './components/RequireReceptionClaim';
import RequireDoctorClaim from './components/RequireDoctorClaim';


const RoutesConfig = () => {
  const user = useSelector(selectUser);
  const claims = useSelector(selectClaims);
  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      {
        user? 
          claims.receptionist ? 
            <>
              <Route path="/dashboard" element={<RequireReceptionClaim><ReceptionistDashboard /></RequireReceptionClaim>} />
              <Route path="/appointments" element={<RequireReceptionClaim><ReceptionistAppointmentPage /></RequireReceptionClaim>} />
            </>
          : 
            claims.doctor? 
              <>
                <Route path="/dashboard" element={<RequireDoctorClaim><DoctorDashboardPage /></RequireDoctorClaim>} />
              </>
              : 
              <>
                <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
                <Route path="/profile" element={ <RequireAuth><ProfilePage /></RequireAuth>} />
                <Route path="/appointments" element={ <RequireAuth><AppointmentPage /></RequireAuth>} />
              </>
        :
        <Route path="*" element={<NotFoundPage />} />
      }
    </Routes>
  );
};


export default RoutesConfig;