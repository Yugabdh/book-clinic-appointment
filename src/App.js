import './assets/style/main.scss';
import { 
  BrowserRouter
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import RoutesConfig from './Route';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <NavbarComponent />
            <main>
              <RoutesConfig />
            </main>
          <FooterComponent />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
