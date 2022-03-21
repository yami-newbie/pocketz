import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3'
import useLocalStorage from '../hooks/useLocalStorage';

// let web3 = new Web3(
//   "wss://ropsten.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647"
// );

// class AccountDataService {
//   create = () => {
//     const account = web3.eth.accounts.create();
//     return account;
//   };

//   getLibrary = (provider) => {
//     web3 = new Web3(provider);
//     return web3;
//   }

//   getBalance = async (address) => {
//     var balance = await web3.eth.getBalance(address); //Will give value in.
//     balance = web3.utils.fromWei(String(balance));
//     return balance.toString();
//   }
// }
// export default new AccountDataService();
const defaultProvider = [
  {
    providerUrl: "wss://ropsten.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: true,
    name: "ropsten",
  },
  {
    providerUrl: "wss://mainnet.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "mainnet",
  },
  {
    providerUrl: "wss://kovan.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "kovan",
  },
  {
    providerUrl: "wss://rinkeby.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "rinkeby",
  },
  {
    providerUrl: "wss://goerli.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "goerli",
  },
  {
    providerUrl:
      "wss://palm-mainnet.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "palm-mainnet",
  },
  {
    providerUrl:
      "wss://palm-testnet.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "palm-testnet",
  },
];



const web3Service = createContext();

export const useWeb3Service = () => {
  return useContext(web3Service);
};

export default function ProviderWeb3Service({ children }) {
  const auth = AccountETH();
  return <web3Service.Provider value={auth}>{children}</web3Service.Provider>;
}

function AccountETH() {

  let web3 = null;

  const [providers, setProviders] = useLocalStorage(
    "providers",
    defaultProvider
  );

  const create = () => {
    const account = web3.eth.accounts.create();
    return account;
  };

  const getSelectedProvider = () => {
    let _selected = null;
    providers.map((provider) => {
      if(provider.selected)
        _selected = provider;
    })

    return _selected;
  }

  const getProviders = () => {
    return providers;
  }

  const addProvider = ({
    provider: _providerUrl,
    name: _name
  }) => {
    setProviders([
      ...providers,
      {
        providerUrl: _providerUrl,
        name: _name,
        selected: false,
      },
    ]);
  }

  const switchProvider = (providerUrl) => {
    providers.map((provider) => {
      if(provider.providerUrl === providerUrl){
        setSelectProvider({
          provider: provider,
          isSelect: true,
        })
      }
      else {
        setSelectProvider({
          provider: provider,
          isSelect: false,
        });
      }
    });
  }

  const setSelectProvider = ({
    provider: _provider,
    isSelect: value
  }) => {
    return {
      providerUrl: _provider.providerUrl,
      name: _provider.name,
      selected: value
    };
  }

  const getWeb3 = () => {
    web3 = (new Web3(getSelectedProvider().providerUrl));
    return web3;
  };

  const getBalance = async (address) => {
    var balance = await getWeb3().eth.getBalance(address); //Will give value in.
    balance = web3.utils.fromWei(String(balance));
    return balance.toString();
  };

  useEffect(() => {
    const init = () => {
      console.log("it init");
    }
    init();
  }, [])

  return {
    providers,
    create,
    getBalance,
    getLibrary: getWeb3,
    getProviders,
    addProvider,
    switchProvider,
    getSelectedProvider,
  };
}
