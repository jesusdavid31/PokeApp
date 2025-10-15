import { useState } from 'react';
import { HashRouter, useRoutes } from 'react-router-dom';

// MUI
import { Box } from '@mui/material';

import Router from './routes/Router';

// Componentes
import ScrollToTop from './components/shared/ScrollToTop';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

function AppRoutes() {
  const routing = useRoutes(Router);
  return <ScrollToTop>{routing}</ScrollToTop>;
}

function App() {

  const [openMenu, setOpenMenu] = useState(true);
  const headerHeight = 120;
  const sidebarWidth = 350;

  return (
    <HashRouter>
      <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <Box
        component="main"
        sx={{
          marginTop: `${headerHeight}px`,
          // Espaciado lateral responsive (0 en sm, 350px en md y superior)
          marginLeft: { sm: 0, md: `${sidebarWidth}px` },
          padding: "1rem",
          transition: "margin-left 0.3s ease",
        }}
      >
        <AppRoutes />
      </Box>
    </HashRouter>
  );

}

export default App;