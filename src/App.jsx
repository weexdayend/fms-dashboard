import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

// Import pages
import NotFound from './_404';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import FuelInventory from './pages/FuelInventory';
import EventViewer from './pages/EventViewer';
import Users from './pages/Users';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="*" element={<NotFound />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/transactions" element={<Transactions />} />
        <Route exact path="/fuel-inventory" element={<FuelInventory />} />
        <Route exact path="/event-viewer" element={<EventViewer />} />
        <Route exact path="/account/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
