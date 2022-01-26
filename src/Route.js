import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { useRoutes } from 'react-router-dom';

const RoutesConfig = () => {
  let routes = useRoutes([
    { path: '/', element: <LandingPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/login', element: <LoginPage /> },
    // {
    //   path: '/profile',
    //   element: <ProfilePage />,
    //   children: [
    //     { 
    //       path: '/appointments',
    //       element: <Appointments />,
    //       children: [
    //         { path: ':id', element: <Appointment /> },
    //       ]
    //     },
    //   ]
    // }
  ]);

  return routes;
};

export default RoutesConfig;