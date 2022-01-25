import './assets/style/main.scss';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import LandingPage from './pages/landing';

function App() {
  return (
    <>
      <NavbarComponent />
      <LandingPage />
      <FooterComponent />
    </>
  );
}

export default App;
