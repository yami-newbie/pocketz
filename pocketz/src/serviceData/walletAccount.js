import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

export function ProvideAuth({ children }) {
  const auth = WalletAccountData();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

function WalletAccountData(){

    const [wallet, setWallet] = useLocalStorage("wallet", {});

    const signin = (password) => {
        if(password === wallet.password){
            setWallet({
            password: wallet.password,
            isLogin: true,
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
        password: wallet.password,
        isLogin: false,
      });
    };

    const signup = (password) => {
        return setWallet({
          password: password,
          isLogin: true,
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
        signout
    }
}
