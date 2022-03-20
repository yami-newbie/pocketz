import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { AppProvider } from './components/Provider/AppProvider';
import CreateAccountPage from './pages/CreateAcountPage';
import HomePage from './pages/HomePage';
import ImportAccountPage from './pages/ImportAccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
//import { useMoralis } from "react-moralis";

function App() {
  // const {
  //   authenticate,
  //   isAuthenticated,
  //   isAuthenticating,
  //   user,
  //   account,
  //   logout,
  // } = useMoralis();
  // useEffect(() => {
  //   const login = async () => {
  //     if (!isAuthenticated) {

  //       await authenticate({signingMessage: "Log in using Moralis" })
  //         .then(function (user) {
  //           console.log("logged in user:", user);
  //           console.log(user?.get("ethAddress"));
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });
  //     }
  //   }
  //   login();
  // }, [])
  return (
    <AppProvider>
        <BrowserRouter>
          <Routes>
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
