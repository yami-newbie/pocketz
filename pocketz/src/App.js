import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { AppProvider } from './components/Provider/AppProvider';
import AddTokenPage from './pages/AddTokenPage';
import CreateAccountPage from './pages/CreateAcountPage';
import HomePage from './pages/HomePage';
import ImportAccountPage from './pages/ImportAccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SendMainAltPage from './pages/SendMainAltPage';
import SendTransactionPage from './pages/SendTxPage';

function App() {

  useEffect(() => {
    console.log("open app???")
    return () => {
      setTimeout(() => {console.log("close app???")}, 5000)
    }
  }, [])

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage />}></Route>
          <Route path="/sendtx" element={<SendTransactionPage />}></Route>
          <Route path="/sendtx/detail" element={<SendMainAltPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/import" element={<ImportAccountPage />}></Route>
          <Route path="/create" element={<CreateAccountPage />}></Route>
          <Route path="/addtoken" element={<AddTokenPage />}></Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
