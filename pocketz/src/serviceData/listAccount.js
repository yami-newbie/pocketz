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

const LoadState = {
  free: -1,
  pending: 0,
  done: 1,
};

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
  var loadDone = useRef(0);
  var txList = useRef();

  //#region import, create, remove Account
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
      pendingHash: null,
    };
    if (accounts) {
      // console.log("accounts", accounts);
      setAccounts([..._NotSelectAccount(accounts), newAcc]);
    } else {
      setAccounts([newAcc]);
    }
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
            pendingHash: account.pendingHash,
          };
        }
      })
    );
  };

  //#endregion

  //#region set Account
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
      account: account.account,
      pendingHash: account.pendingHash,
    };
  };

  const setPendingHash = (pendingHash) => {
    const account = getSelectedAccount();
    setAccounts(
      accounts.map((acc) => {
        if(acc.account.address === account.account.address) {
          return {
            key: acc.key,
            avatarSrc: acc.avatarSrc,
            username: acc.username,
            selected: acc.selected,
            account: acc.account,
            pendingHash: pendingHash,
          };
        }
        else {
          return acc;
        }
      })
    )
  }
  //#endregion

  //#region reload balance
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
          count: item.count,
        };
      }
    });
    if (count !== balances.length) balances.current = list;
    else
      balances.current = [
        ...balances,
        {
          address: address,
          balance: balance,
          state: LoadState.free,
          count: 0,
        },
      ];
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
          count: item.count,
        };
      }
    });
  };

  const setFreeState = (address) => {
    setLoadState(address, LoadState.free);
  };

  const setPendingState = (address) => {
    setLoadState(address, LoadState.pending);
  };

  const setDoneState = (address) => {
    setLoadState(address, LoadState.done);
    setDoneLoad(address);
  };

  const setDoneLoad = (address) => {
    balances.current = balances.current.map((item) => {
      if (item.address !== address) {
        return item;
      } else {
        return {
          address: item.address,
          balance: item.balance,
          state: item.state,
          count: item.count + 1,
        };
      }
    });
  };

  const getMinLoadDone = () => {
    let min = balances.current[0] ? balances.current[0].count : 0;
    balances.current.map((item) => {
      if (min > item.count) {
        min = item.count;
      }
    });
    return min;
  };

  const getBalance = (address) => {
    let balance = 0;
    balances.current.map((item) => {
      if (item.address === address) {
        balance = item.balance;
      }
    });
    return balance;
  };

  const getLoadState = (address) => {
    let state = LoadState.free;
    balances.current.map((item) => {
      if (item.address === address) {
        state = item.state;
      }
    });
    return state;
  };

  const getLoadDone = (address) => {
    let count = getMinLoadDone();
    balances.current.map((item) => {
      if (item.address === address) {
        count = item.count ? item.count : getMinLoadDone();
      }
    });
    return count;
  };

  const setAllFreeState = () => {
    balances.current = balances.current.map((item) => {
      return {
        address: item.address,
        balance: item.balance,
        state: LoadState.free,
        count: item.count,
      };
    });
  };

  const ReloadBalances = () => {
    accounts.map(async (acc) => {
      const address = acc.account.address;
      switch (getLoadState(address)) {
        case 1: {
          setFreeState(address);
          break;
        }
        case -1: {
          // if(!isCanReload(address))
          //   break;
          setPendingState(address, 0);
          await web3.getBalance(address).then((balance) => {
            setBalance(address, fixBalance(balance));
            loadDone.current = loadDone.current + 1;
            setDoneState(address);
          });
          break;
        }
        default:
          break;
      }
    });
  };

  const fixBalance = (_balance) => {
    return _balance?.toString().substr(0, 6);
  };

  const setBalancesData = () => {
    balances.current = accounts.map((acc) => {
      const address = acc.account.address;

      return {
        address: address,
        balance: getBalance(address),
        state: getLoadState(address),
        count: getLoadDone(address),
      };
    });
  };
  //#endregion

  //#region list tx

  const fetchTxlist = async () => {
    const account = getSelectedAccount();
    await web3.getTransactionLogAccount(account.account.address).then((res) => {
      txList.current = (res);
    });
  }

  const fetchPendingTxList = async () => {
    const account = getSelectedAccount();
    await web3.getPendingTransactions(account.account.address);
  }

  const getTxList = () => {
    return txList.current;
  }

  //#endregion

  useEffect(() => {
    const init = () => {
      getSelectedAccount();
      setBalancesData();
      fetchTxlist();
      console.log("init", accounts);
      return accounts ? null : createAccount("");
    };
    init();
    const interval = setInterval(() => setTime(Date.now()), 15000);

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
      setBalancesData();
    };
    load();
  }, [accounts]);

  useEffect(() => {
    setAllFreeState();
  }, [web3.providers]);

  useEffect(() => {
    const reload = () => {
      try {
        ReloadBalances();
        fetchTxlist();
        fetchPendingTxList();
      } catch (e) {
        console.log(e);
      }
    };
    reload();
  }, [time]);

  useEffect(() => {
    setPendingHash(web3.pendingHash.current);
  }, [web3.pendingHash.current]);

  return {
    accounts,
    balances,
    txList,
    importAccount,
    selectAccount,
    removeAccount,
    getSelectedAccount,
    createAccount,
    changeUsername,
    getBalance,
    getTxList,
  };
}
