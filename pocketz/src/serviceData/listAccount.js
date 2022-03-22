import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useWallet } from "./walletAccount";
import { useWeb3Service } from "../serviceData/accountETH";

const listAccount = createContext();

export const useListAccount = () => {
  return useContext(listAccount);
};

export function ProvideAccountList({ children }) {
  const auth = ListAccountData();
  return <listAccount.Provider value={auth}>{children}</listAccount.Provider>;
}

function ListAccountData() {
  const wallet = useWallet();
  const [accounts, setAccounts] = useState(wallet.wallet.accounts);
  const [key, setKey] = useLocalStorage("key", 0);
  const [count, setCount] = useLocalStorage("count", 0);
  const web3 = useWeb3Service();

  const importAccount = ({username, address, privateKey}) => {
    setKey(key + 1);
    if (username === "") {
      setCount(count + 1);
    }
    const newAcc = {
        key: key,
        username: username !== "" ? username : "Account " + count,
        selected: true,
        account: {
          address: address,
          privateKey: privateKey,
        },
      }
    if(accounts){
      // console.log("accounts", accounts);
      setAccounts([..._NotSelectAccount(accounts), newAcc]);
    }
    else {
      setAccounts([newAcc])
    }
  };

  const _NotSelectAccount = (_accounts) => {
    let list = [];
    _accounts.forEach((element) => {
      list = [...list, setSelectedValue({
        account: element,
        value: false,
      })]
    })
    return list;
  }

  const selectAccount = (key) => {
    let list = [];
    accounts.map((account) => {
      if(account.key !== key) {
        list = [
          ...list,
          setSelectedValue({
            account: account,
            value: false,
          }),
        ];
      }
      else {
        list = [
          ...list,
          setSelectedValue({
            account: account,
            value: true,
          }),
        ];
      }
    })
    setAccounts(list);
  }

  const getSelectedAccount = () => {
    let _account = false;
    accounts?.map((account) => {
      if(account.selected)
        _account = account;
    })
    return _account;
  }

  const setSelectedValue = ({account, value}) => {
    return {
      key: account.key,
      username: account.username,
      selected: value,
      account: {
        address: account.account.address,
        privateKey: account.account.privateKey,
      },
    };
  };

  const removeAccount = (account) => {
    let list = [];
    accounts.map((_account) => {
      if(_account.address !== account.address){
        list = [...list, _account];
      }
    })
    if(list.length === accounts.length)
      throw Error("Tai khoan khong ton tai");
    setAccounts(list);
  }

  const createAccount = async (username) => {
    const acc = await web3.create();
    importAccount({
      username: username ? username : "",
      address: acc.address,
      privateKey: acc.privateKey,
    });
  }

  useEffect(() => {
    const init = () => {
      getSelectedAccount();
      return accounts? null : createAccount("");
    }
    init();
    const unsubscribe = () => {
      if (accounts) {
        setAccounts(accounts);
      } else {
        setAccounts(false);
      }
    };
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const load = () => {
      wallet.setAccounts(accounts);
    }
    load();
  }, [accounts])


  return {
    accounts,
    importAccount,
    selectAccount,
    removeAccount,
    getSelectedAccount,
    createAccount,
  };
}
