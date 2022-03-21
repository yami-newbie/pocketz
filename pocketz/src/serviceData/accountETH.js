import { ethers } from 'ethers';
import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3'
import useLocalStorage from '../hooks/useLocalStorage';

export const defaultProvider = [
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
    const account = getWeb3().eth.accounts.create();
    return account;
  };

  const sendTx = async () => {
    const myAddress = "0x9b256C409b86dD70C3F335f2Ed404F4Be314BfF5"; //TODO: replace this address with your own public address

    const nonce = await getWeb3().eth.getTransactionCount(myAddress, "latest");
    let gasPrice = null;
    web3.eth.getGasPrice().then((gas) => {gasPrice = gas});
    const transaction = {
      to: "toAddress", // faucet address to return eth
      value: ethers.utils.parseUnits("0.001", "ether"),
      gas: gasPrice,
      maxPriorityFeePerGas: ethers.utils.hexlify(100000),
      nonce: nonce,
      // optional data field to send message or execute smart contract
    };
    console.log(transaction);
    // const signedTx = await web3.eth.accounts.signTransaction(
    //   transaction,
    //   "privateKey"
    // );

    // web3.eth.sendSignedTransaction(
    //   signedTx.rawTransaction,
    //   function (error, hash) {
    //     if (!error) {
    //       console.log(
    //         "🎉 The hash of your transaction is: ",
    //         hash,
    //         "\n Check Alchemy's Mempool to view the status of your transaction!"
    //       );
    //     } else {
    //       console.log(
    //         "❗Something went wrong while submitting your transaction:",
    //         error
    //       );
    //     }
    //   }
    // );
  };

  const setDefaultAccount = (address) => {
    getWeb3().defaultAccount = address;
  }

  const getDefaultAccount = () => {
    return getWeb3().defaultAccount;
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

  return {
    providers,
    create,
    getBalance,
    getWeb3,
    getProviders,
    addProvider,
    switchProvider,
    getSelectedProvider,
    setDefaultAccount,
    getDefaultAccount,
    sendTx,
  };
}