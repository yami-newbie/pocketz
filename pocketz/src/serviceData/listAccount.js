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
    try {
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
      if(accounts){
        setAccounts([
          ...accounts.map((acc) => ({ ...acc, selected: false })),
          newAcc,
        ]);
      }
      else {
        setAccounts([newAcc]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const removeAccount = (account) => {
    var newList = [];
    accounts.map((acc) =>
      acc !== account ? (newList = [...newList, acc]) : null
    );
    console.log(newList);
    setAccounts(newList);
  };

  const createAccount = async (username) => {
    try {
      await web3.create().then((acc) => {
        if (acc) {
          importAccount({
            username: username ? username : "",
            address: acc.address,
            privateKey: acc.privateKey,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeUsername = (account, username) => {
    setAccounts(
      accounts.map((_account) =>
        _account === account ? { ...account, username: username } : account
      )
    );
  };

  //#endregion

  //#region set Account

  const selectAccount = (address) => {
    setAccounts(
      accounts.map((account) =>
        account.account.address === address
          ? { ...account, selected: true }
          : { ...account, selected: false }
      )
    );
  };

  const getSelectedAccount = () => {
    if (!accounts) return;

    const res = accounts.filter((account) => account.selected);

    if (res.length > 0) {
      return res[0];
    } else {
      console.log("Accounts", accounts);
      selectAccount(accounts[0].account.address);
      return accounts[0];
    }
  };

  const setPendingHash = (pendingHash) => {
    const address = getSelectedAccount()?.account.address;
    setAccounts(
      accounts?.map((account) =>
        account.account.address === address
          ? { ...account, pendingHash: pendingHash }
          : account
      )
    );
  };
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
          ...item,
          balance: balance,
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
    balances.current = balances.current.map((item) =>
      item.address !== address ? item : { ...item, state: state }
    );
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
    balances.current = balances.current.map((item) =>
      item.address !== address ? item : { ...item, count: item.count + 1 }
    );
  };

  const getMinLoadDone = () => {
    let min = balances.current[0] ? balances.current[0].count : 0;
    balances.current.map((item) => (min = item.count < min ? item.count : min));
    return min;
  };

  const getBalance = (address) => {
    let balance = 0;
    balances.current.map(
      (item) => (balance = item.address === address ? item.balance : balance)
    );
    //  if (item.address === address) {
    //    balance = item.balance;
    //  }
    return balance;
  };

  const getLoadState = (address) => {
    let state = LoadState.free;
    balances.current.map(
      (item) => (state = item.address === address ? item.state : state)
    );
    return state;
  };

  const getLoadDone = (address) => {
    let count = getMinLoadDone();
    balances.current.map(
      (item) =>
        (count =
          item.address === address
            ? item.count
              ? item.count
              : getMinLoadDone()
            : count)
    );
    return count;
  };

  const setAllFreeState = () => {
    if (balances.current) {
      balances.current = balances.current?.map((item) => ({
        ...item,
        state: LoadState.free,
      }));
    }
  };

  const ReloadBalances = () => {
    if (accounts)
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
    if(accounts && accounts.length > 0){
      balances.current = accounts?.map((acc) => {
        const address = acc.account.address;
        return {
          address: address,
          balance: getBalance(address),
          state: getLoadState(address),
          count: getLoadDone(address),
        };
      });
    }
    
  };
  //#endregion

  //#region list tx

  const fetchTxlist = async () => {
    const account = getSelectedAccount();
    if (account)
      await web3
        .getTransactionLogAccount(account.account.address)
        .then((res) => {
          txList.current = res;
        });
  };

  const fetchPendingTxList = async () => {
    const account = getSelectedAccount();
    if (account) await web3.getPendingTransactions(account.account.address);
  };

  const getTxList = () => {
    return txList.current;
  };

  //#endregion

  useEffect(() => {
    const init = () => {
      getSelectedAccount();
      setBalancesData();
      fetchTxlist();
      return accounts ? null : createAccount("");
    };
    init();
    const interval = setInterval(() => setTime(Date.now()), 3000);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const load = () => {
      wallet.setAccounts(accounts);
      setBalancesData();
    };
    if(accounts && accounts.length > 0)
      load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    setPendingHash(web3.pendingHash.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
