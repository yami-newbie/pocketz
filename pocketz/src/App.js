import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ProvideAuth } from './serviceData/walletAccount';

function App() {
 
  return (
    <BrowserRouter>
      <ProvideAuth>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </ProvideAuth>
    </BrowserRouter>
  );
}

export default App;
