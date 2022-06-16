import { createContext, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3Service } from "./accountETH";
import { throws } from "assert";

const UserContext = createContext();

export const useWallet = () => {
  return useContext(UserContext);
};

export function ProvideAuth({ children }) {
  const auth = WalletAccountData();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
}

function WalletAccountData() {
  const web3Service = useWeb3Service();
  const setWallet = web3Service.setWallet;
  const setPassword = web3Service.setPassword;
  const wallet = web3Service.wallet;

  window.onload = () => {
    window.localStorage.setItem("signin", new Date().getTime());
    const time = window.localStorage.getItem("last signin");
    const timeoff = new Date().getTime() - time;
    if (timeoff / 1000 > 5 * 60) {
      signout();
    }
  };

  window.onbeforeunload = () => {
    window.localStorage.setItem("last signin", new Date().getTime());
  };

  window.onunload = () => {
    window.localStorage.setItem("last signin", new Date().getTime());
  }

  window.onclose = () => {
    window.localStorage.setItem("last signin", new Date().getTime());
  };

  const signin = (password) => {
    try {
      if (password === wallet.password || password === wallet.mnemonic) {
        // setPassword(password);
        setWallet({
          ...wallet,
          isLogin: true,
        });
        return true;
      } else return false;
    } catch (error) {
      console.log(error);
    }
    // if (password === wallet.password) {
    //   setWallet({
    //     ...wallet,
    //     isLogin: true,
    //   });
    //   return true;
    // } else {
    //   // eslint-disable-next-line no-throw-literal
    //   throw "password not true";
    // }
  };

  const signout = () => {
    try {
      // setPassword(wallet.password);
      setWallet({
        ...wallet,
        isLogin: false,
      });
      // setPassword();
    } catch (error) {
      console.log(error);
    }
  };

  const signup = (password) => {
    try {
      setPassword(password);
      const newWallet = {
        password: password,
        isLogin: false,
        mnemonic: ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16)),
        accounts: [],
      };
      setWallet(newWallet);
      return newWallet;
    } catch (error) {
      console.log(error);
    }
  };

  const getMnemonic = () => {
    return wallet.mnemonic;
  };

  const setAccounts = (accounts) => {
    try {
      // setPassword(wallet.password);
      setWallet({
        ...wallet,
        accounts: accounts,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changePass = (newPass, mnemonic) => {
    if(wallet.mnemonic === mnemonic) {
      console.log(wallet, mnemonic)
      setWallet({...wallet, password: newPass})
    }
    else throw "mnemonic is not true";
  }

  useEffect(() => {}, []);

  return {
    wallet,
    signin,
    signup,
    signout,
    getMnemonic,
    setAccounts,
    changePass
  };
}
