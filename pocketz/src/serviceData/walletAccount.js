import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ethers } from "ethers";
import useEncryptStorage from "../hooks/useEncryptStorage";
import { useWeb3Service } from "./accountETH";

const UserContext = createContext();

export const useWallet = () => {
  return useContext(UserContext);
};

export function ProvideAuth({ children }) {
  const auth = WalletAccountData();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

function WalletAccountData(){
  const web3Service = useWeb3Service();
  const setWallet = web3Service.setWallet;
  const setPassword = web3Service.setPassword;
  const wallet = web3Service.wallet;

  window.onload = () => {
    const time = window.localStorage.getItem("last signin");
    const timeoff = new Date().getTime() - time;
    if(timeoff / 1000 > 5 * 60){
      signout();
    }
  }

  window.onbeforeunload = () => {
    window.localStorage.setItem("last signin", new Date().getTime())
  };

    const signin = (password) => {
      try {
        setPassword(password);
        setWallet({
          ...wallet,
          isLogin: true,
        });
        return true;
      } catch (error) {
        console.log(error)
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
    }
    
    const signout = () => {
      try {
        setPassword(wallet.password);
        setWallet({
          ...wallet,
          isLogin: false,
        });
        setPassword();
      } catch (error) {
        console.log(error)
      }
    };

    const signup = async (password) => {
      try {
        setPassword(password);
        setWallet({
          password: password,
          isLogin: true,
          mnemonic: wallet.mnemonic
            ? wallet.mnemonic
            : await ethers.utils.entropyToMnemonic(
                ethers.utils.randomBytes(16)
              ),
          accounts: wallet.accounts ? wallet.accounts : [],
        });
      } catch (error) {
        console.log(error);
      }
    }

    const getMnemonic = () => {
      return wallet.mnemonic
    }

    const setAccounts = (accounts) => {
      try {
        setPassword(wallet.password);
        setWallet({
          ...wallet,
          accounts: accounts,
        });
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      
    }, [])

    return {
      wallet,
      signin,
      signup,
      signout,
      getMnemonic,
      setAccounts,
    };
}
