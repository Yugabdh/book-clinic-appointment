import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AppointmentPage from './pages/AppointmentPage';

import RequireAuth from './components/RequireAuthComponent'
import { Routes, Route } from 'react-router-dom';



const RoutesConfig = () => {

  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
      <Route path="/profile" element={ <RequireAuth><ProfilePage /></RequireAuth>} />
      <Route path="/appointments" element={ <RequireAuth><AppointmentPage /></RequireAuth>} />
    </Routes>
  );
//   let routes = useRoutes([
//     { path: '/', element: <LandingPage /> },
//     { path: '/register', element: <RegisterPage /> },
//     { path: '/login', element: <LoginPage /> },
//     { path: '/dashboard', element: <RequireAuth><DashboardPage /></RequireAuth>},
//     { path: '/profile', element: <RequireAuth><ProfilePage /></RequireAuth>},
//     { path: '/appointments', element: <RequireAuth><AppointmentPage /></RequireAuth>}
//     // {
//     //   path: '/profile',
//     //   element: <ProfilePage />,
//     //   children: [
//     //     { 
//     //       path: '/appointments',
//     //       element: <Appointments />,
//     //       children: [
//     //         { path: ':id', element: <Appointment /> },
//     //       ]
//     //     },
//     //   ]
//     // }
//   ]);

//   return routes;
};


export default RoutesConfig;