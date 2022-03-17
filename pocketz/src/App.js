import React, { useMemo } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import useLocalStorage from './hooks/useLocalStorage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContext } from './service/UserContext';

function App() {
  const [wallet, setWallet] = useLocalStorage("wallet", {});
  const providerValue = useMemo(
    () => ({ wallet, setWallet }),
    [wallet, setWallet]
  );
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login"> Sign In</Link>
          </li>
          <li>
            <Link to="/register"> Sign Up</Link>
          </li>
        </ul>
      </nav>
      <UserContext.Provider value={providerValue}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
