import React, { useMemo } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ListAccount from './components/ListAccount';
import LogOut from './components/LogOut';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import useLocalStorage from './hooks/useLocalStorage';
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
          <Route path="/" element={<ListAccount/>}></Route>
          <Route path="/login" element={<SignIn/>}></Route>
          <Route path="/register" element={<SignUp/>}></Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
