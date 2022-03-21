import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { AppProvider } from './components/Provider/AppProvider';
import CreateAccountPage from './pages/CreateAcountPage';
import HomePage from './pages/HomePage';
import ImportAccountPage from './pages/ImportAccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SendTransactionPage from './pages/SendTxPage';

function App() {

  return (
    <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/sendtx" element={<SendTransactionPage/>}></Route>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/import" element={<ImportAccountPage />}></Route>
            <Route path="/create" element={<CreateAccountPage />}></Route>
          </Routes>
        </BrowserRouter>
    </AppProvider>
  );
}

export default App;
