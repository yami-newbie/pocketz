import React, {useEffect, useMemo } from 'react'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './components/AppRoutes';
import { createBrowserHistory } from 'history';
import { AppProvider } from './components/Provider/AppProvider';


function App() {
  const basename = useMemo(() => window.location.pathname, []);

  return (
    <AppProvider>
      <BrowserRouter basename={basename.includes("index.html") ? "/index.html" : "/"}>
        <AppRoutes/>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
