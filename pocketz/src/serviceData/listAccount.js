import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const listAccount = createContext();

export const useListAccount = () => {
  return useContext(listAccount);
};

export function ProvideAccountList({ children }) {
  const auth = ListAccountData();
  return <listAccount.Provider value={auth}>{children}</listAccount.Provider>;
}

function ListAccountData() {
  const [accounts, setAccounts] = useLocalStorage("listAccount", []);

  const importAccount = ({key, count, address, privateKey}) => {
    setAccounts([
      ...accounts,
      {
        key: key,
        username: "Account " + count,
        account: {
          address: address,
          privateKey: privateKey,
        },
      },
    ]);
  };

  const addAccount = (acc) => {
    return setAccounts([...accounts, acc]);
  }

  useEffect(() => {
    const unsubscribe = () => {
      if (accounts) {
        setAccounts(accounts);
      } else {
        setAccounts(false);
      }
    };
    return () => unsubscribe();
  }, []);

  return {
    accounts,
    importAccount,
    addAccount,
  };
}
