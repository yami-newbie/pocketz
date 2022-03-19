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
      if(account.key !== key) {
        list = [...list, setSelectedFalse(account)];
      }
      else {
        list = [...list, setSelectedTrue(account)];
      }
    })
    setAccounts(list);
  }

  const getSelectedAccount = () => {
    let _account = null;
    accounts.map((account) => {
      if(account.selected)
        _account = account;
    })
    return _account;
  }

  const setSelectedFalse = (account) => {
    return {
      key: account.key,
      username: account.username,
      selected: false,
      account: {
        address: account.account.address,
        privateKey: account.account.privateKey,
      },
    };
  };

  const setSelectedTrue = (account) => {
    console.log(account);
    return {
      key: account.key,
      username: account.username,
      selected: true,
      account: {
        address: account.account.address,
        privateKey: account.account.privateKey,
      },
    };
  };

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
    selectAccount,
    getSelectedAccount,
  };
}
