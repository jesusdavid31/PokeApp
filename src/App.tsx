import { HashRouter, useRoutes } from 'react-router-dom';

import Router from './routes/Router';

import ScrollToTop from './components/shared/ScrollToTop';
import Header from './components/Header/Header';

function AppRoutes() {
  const routing = useRoutes(Router);
  return <ScrollToTop>{routing}</ScrollToTop>;
}

function App() {

  return (
    <HashRouter>
      <Header />
      <AppRoutes />
    </HashRouter>
  );

}

export default App;