import React, {useMemo } from 'react'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './components/AppRoutes';
import { createBrowserHistory } from 'history';
import { AppProvider } from './components/Provider/AppProvider';


function App() {
  const basename = useMemo(() => window.location.pathname, []);


  return (
    <AppProvider>
      <BrowserRouter basename={basename}>
        <AppRoutes/>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
