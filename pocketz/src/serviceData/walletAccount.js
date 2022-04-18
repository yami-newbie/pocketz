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

    const [wallet, setWallet] = useEncryptStorage("wallet", {});

    const signin = (password) => {
        if(password === wallet.password){
            setWallet({
              password: wallet.password,
              isLogin: true,
              mnemonic: getMnemonic(),
              accounts: wallet.accounts,
            });
            return true; 
        }
        else {
            // eslint-disable-next-line no-throw-literal
            throw "password not true";
        }
    }
    
    const signout = () => {
      return setWallet({
        ...wallet,
        isLogin: false,
        mnemonic: getMnemonic(),
      });
    };

    const signup = async (password) => {
      setWallet({
        password: password,
        isLogin: true,
        mnemonic: wallet.mnemonic? wallet.mnemonic : await ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16)),
        accounts: wallet.accounts? wallet.accounts : [],
      });
    }

    const getMnemonic = () => {
      return wallet.mnemonic
    }

    const setAccounts = (accounts) => {
      setWallet({
        ...wallet,
        accounts: accounts,
      });
    }

    useEffect(() => {
      const unsubscribe = () => {
        if (wallet) {
          setWallet(wallet);
        } else {
          setWallet(false);
        }
      };
      return () => unsubscribe();
    }, []);

    return {
      wallet,
      signin,
      signup,
      signout,
      getMnemonic,
      setAccounts,
    };
}
