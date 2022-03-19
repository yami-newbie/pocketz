import { createContext, useContext, useEffect, useState } from "react";
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
  const [key, setKey] = useLocalStorage("key", 0);
  const [count, setCount] = useLocalStorage("count", 0);

  const importAccount = ({username, address, privateKey}) => {
    console.log("it here");
    setKey(key + 1);
    if (username === "") 
      setCount(count + 1);
      setAccounts([
      ...accounts,
      {
        key: key,
        username: username !== "" ? username : "Account " + count,
        selected: false,
        account: {
          address: address,
          privateKey: privateKey,
        },
      },
    ]);
  };

  const selectAccount = (key) => {
    let list = [];
    accounts.map((account) => {
      if(account.key != key) {
        list = [...list, setSelectedFalse(account)];
      }
      else {
        list = [...list, setSelectedTrue(account)];
      }
    })
    setAccounts(list);
  }

  const setSelectedFalse = (account) => {
    return {
      key: account.key,
      username: account.username,
      selected: false,
      account: {
        address: account.address,
        privateKey: account.privateKey,
      },
    };
  };

  const setSelectedTrue = (account) => {
    return {
      key: account.key,
      username: account.username,
      selected: true,
      account: {
        address: account.address,
        privateKey: account.privateKey,
      },
    };
  };

  useEffect(() => {
    const unsubscribe = () => {
      console.log("work?")
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
    selectAccount,
  };
}
