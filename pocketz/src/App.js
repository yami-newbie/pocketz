import { createBrowserHistory } from 'history';
import React, { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgetPass from './components/ConnectWallet/ForgetPass';
import { AppProvider } from './components/Provider/AppProvider';
import AddTokenPage from './pages/AddTokenPage';
import CreateAccountPage from './pages/CreateAcountPage';
import HomePage from './pages/HomePage';
import ImportAccountPage from './pages/ImportAccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SendMainAltPage from './pages/SendMainAltPage';
import SendTransactionPage from './pages/SendTxPage';
import { useWeb3Service } from './serviceData/accountETH';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const basename = useMemo(() => window.location.pathname, []);
  const web3Service = useWeb3Service();

  useEffect(() => {
    if(web3Service){
      setIsLogin(web3Service.wallet.isLogin)
      console.log(web3Service)
    }
  }, [web3Service])

  return (
    <AppProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/restore-vault" element={<ForgetPass />}></Route>
          {isLogin ? (
            <>
              <Route path='/' element={<HomePage />}></Route>
              <Route path="/sendtx" element={<SendTransactionPage />}></Route>
              <Route
                path="/sendtx/detail"
                element={<SendMainAltPage />}
              ></Route>
              <Route path="/import" element={<ImportAccountPage />}></Route>
              <Route path="/create" element={<CreateAccountPage />}></Route>
              <Route path="/addtoken" element={<AddTokenPage />}></Route>
            </>
          ) : (
            <Route path='/' element={<LoginPage />}></Route>
          )}
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
