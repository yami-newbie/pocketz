import { createContext, useContext, useEffect, useRef, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useWallet } from "./walletAccount";
import { useWeb3Service } from "../serviceData/accountETH";

const listAccount = createContext();
const listAvatar = [
  "/images/91266124_p0.jpg",
  "/images/91848990_p0.jpg",
  "/images/92079201_p0.jpg",
  "/images/92147597_p0.jpg",
  "/images/92412225_p0.jpg",
  "/images/92900006_p0.jpg",
];

export const useListAccount = () => {
  return useContext(listAccount);
};

export function ProvideAccountList({ children }) {
  const auth = ListAccountData();
  return <listAccount.Provider value={auth}>{children}</listAccount.Provider>;
}

const getAvatar = () => {
  const randomAva = Math.floor(Math.random() * listAvatar.length);
  return listAvatar[randomAva];
};

function ListAccountData() {
  const wallet = useWallet();
  const [accounts, setAccounts] = useState(wallet.wallet?.accounts);
  var balances = useRef([]);
  const [key, setKey] = useLocalStorage("key", 0);
  const [count, setCount] = useLocalStorage("count", 0);
  const web3 = useWeb3Service();
  const [time, setTime] = useState(Date.now());
  var loadDone = useRef(-1);

  const importAccount = ({ username, address, privateKey }) => {
    setKey(key + 1);
    if (username === "") {
      setCount(count + 1);
    }
    const newAcc = {
      key: key,
      avatarSrc: getAvatar(),
      username: username !== "" ? username : "Account " + count,
      selected: true,
      account: {
        address: address,
        privateKey: privateKey,
      },
      loadState: 0,
    };
    if (accounts) {
      // console.log("accounts", accounts);
      setAccounts([..._NotSelectAccount(accounts), newAcc]);
    } else {
      setAccounts([newAcc]);
    }
  };

  const _NotSelectAccount = (_accounts) => {
    let list = [];
    _accounts.forEach((element) => {
      list = [
        ...list,
        setSelectedValue({
          account: element,
          value: false,
        }),
      ];
    });
    return list;
  };

  const selectAccount = (key) => {
    let list = [];
    accounts.map((account) => {
      if (account.key !== key) {
        list = [
          ...list,
          setSelectedValue({
            account: account,
            value: false,
          }),
        ];
      } else {
        list = [
          ...list,
          setSelectedValue({
            account: account,
            value: true,
          }),
        ];
      }
    });
    setAccounts(list);
  };

  const getSelectedAccount = () => {
    let _account = false;
    accounts?.map((account) => {
      if (account.selected) _account = account;
    });
    return _account;
  };

  const setSelectedValue = ({ account, value }) => {
    return {
      key: account.key,
      avatarSrc: account.avatarSrc ? account.avatarSrc : getAvatar(),
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
      if (_account.address !== account.address) {
        list = [...list, _account];
      }
    });
    if (list.length === accounts.length) throw Error("Tai khoan khong ton tai");
    setAccounts(list);
  };

  const createAccount = async (username) => {
    const acc = await web3.create();
    importAccount({
      username: username ? username : "",
      address: acc.address,
      privateKey: acc.privateKey,
    });
  };

  const changeUsername = (account, username) => {
    setAccounts(
      accounts.map((_account) => {
        if (_account !== account) {
          return _account;
        } else {
          return {
            key: account.key,
            avatarSrc: account.avatarSrc,
            username: username,
            account: account.account,
            selected: account.selected,
          };
        }
      })
    );
  };

  const setBalance = (address, balance) => {
    let count = 0;
    const list = balances.current.map((item) => {
      if (item.address !== address) {
        count++;
        return item;
      } else {
        return {
          address: item.address,
          balance: balance,
          state: item.state,
        };
      }
    });
    if (count !== balances.length) balances.current = list;
    else
      balances.current = ([
        ...balances,
        {
          address: address,
          balance: balance,
          state: -1,
        },
      ]);
  };

  const setLoadState = (address, state) => {
    balances.current = balances.current.map((item) => {
      if (item.address !== address) {
        return item;
      } else {
        return {
          address: item.address,
          balance: item.balance,
          state: state,
        };
      }
    });
  }

  const getBalance = (address) => {
    let balance;
    balances.current.map((item) => {
      if (item.address === address) {
        balance = item.balance;
      }
    });
    return balance;
  };

  const getLoadState = (address) => {
    let state;
    balances.current.map((item) => {
      if (item.address === address) {
        state = item.state;
      }
    });
    return state;
  };

  useEffect(() => {
    const init = () => {
      getSelectedAccount();
      balances.current = (accounts.map((acc) => {
        return {
          address: acc.account.address,
          balance: 0,
          state: -1,
        }
      }))
      console.log("init", accounts);
      return accounts ? null : createAccount("");
    };
    init();
    const interval = setInterval(() => setTime(Date.now()), 4000);

    const unsubscribe = () => {
      if (accounts) {
        setAccounts(accounts);
      } else {
        setAccounts(false);
      }
    };
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  
  useEffect(() => {
    const load = () => {
      wallet.setAccounts(accounts);
    };
    load();
  }, [accounts]);

  useEffect(() => {
    const loadBalance = () => {
      console.log(balances.current);
      accounts.map(async (acc) => {
        const address = acc.account.address;
        if (getLoadState(address) === 1) {
          setLoadState(address, -1);
        }
        if (getLoadState(address) === -1) {
          console.log("load");
          setLoadState(address, 0);
          await web3.getBalance(address).then((balance) => {
            setBalance(address, fixBalance(balance));
            console.log("done");
            setLoadState(address, 1);
          });
        }
      });      
    };
    const fixBalance = (_balance) => {
      return _balance.toString().substr(0, 6);
    };
    loadBalance();
  }, [time]);

  return {
    accounts,
    importAccount,
    selectAccount,
    removeAccount,
    getSelectedAccount,
    createAccount,
    changeUsername,
    getBalance,
    balances,
  };
}
