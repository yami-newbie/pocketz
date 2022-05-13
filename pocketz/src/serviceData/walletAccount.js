import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ethers } from "ethers";
import useEncryptStorage from "../hooks/useEncryptStorage";

const UserContext = createContext();

export const useWallet = () => {
  return useContext(UserContext);
};

export function ProvideAuth({ children }) {
  const auth = WalletAccountData();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

function WalletAccountData(){

    const [wallet, setWallet, setPassword] = useEncryptStorage("wallet", {});

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
