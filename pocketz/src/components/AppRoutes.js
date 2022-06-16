import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router';
import AddTokenPage from "../pages/AddTokenPage";
import CreateAccountPage from "../pages/CreateAcountPage";
import HomePage from "../pages/HomePage";
import ImportAccountPage from "../pages/ImportAccountPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SendMainAltPage from "../pages/SendMainAltPage";
import ForgetPass from "./ConnectWallet/ForgetPass";
import SendTransactionPage from "../pages/SendTxPage";
import { useWeb3Service } from "../serviceData/accountETH";

function AppRoutes() {
    const web3Service = useWeb3Service();
    const [isLogin, setIsLogin] = useState(web3Service?.wallet.isLogin);

    useEffect(() => {
      console.log(isLogin, web3Service);
      if (web3Service) {
        setIsLogin(web3Service.wallet.isLogin);
        console.log(web3Service);
      }
    }, [web3Service]);
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/restore-vault" element={<ForgetPass />}></Route>
      <Route path="/" element={isLogin ? <HomePage /> : <LoginPage />}></Route>
      {isLogin && (
        <>
          <Route path="/sendtx" element={<SendTransactionPage />}></Route>
          <Route path="/sendtx/detail" element={<SendMainAltPage />}></Route>
          <Route path="/import" element={<ImportAccountPage />}></Route>
          <Route path="/create" element={<CreateAccountPage />}></Route>
          <Route path="/addtoken" element={<AddTokenPage />}></Route>
        </>
      )}
    </Routes>
  );
}

export default AppRoutes