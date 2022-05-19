import './assets/style/main.scss';
import { 
  HashRouter
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import NavbarComponent from './components/NavbarComponent';
import UserAuthCheckComponent from './components/UserAuthCheckComponent';
import FooterComponent from './components/FooterComponent';
import RoutesConfig from './Route';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <NavbarComponent />
          <main>
            <UserAuthCheckComponent>
              <RoutesConfig />
            </UserAuthCheckComponent>
          </main>
        <FooterComponent />
      </HashRouter>
    </Provider>
  );
}

export default App;
