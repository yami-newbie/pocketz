import { BigNumber, ethers } from "ethers";
import { createContext, useContext, useEffect, useRef } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { GetTxListApi } from "./apiRequest";

var Web3 = require("web3");
const axios = require("axios");

export const defaultProvider = [
  {
    key: 1,
    providerUrl:
      "wss://ropsten.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: true,
    name: "ropsten",
  },
  {
    key: 2,
    providerUrl:
      "wss://mainnet.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "mainnet",
  },
  {
    key: 3,
    providerUrl: "wss://kovan.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "kovan",
  },
  {
    key: 4,
    providerUrl:
      "wss://rinkeby.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "rinkeby",
  },
  {
    key: 5,
    providerUrl:
      "wss://goerli.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "goerli",
  },
  {
    key: 6,
    providerUrl:
      "wss://palm-mainnet.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "palm-mainnet",
  },
  {
    key: 7,
    providerUrl:
      "wss://palm-testnet.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "palm-testnet",
  },
];

const gasLimitDefault = 21000;

const web3Service = createContext();

export const useWeb3Service = () => {
  return useContext(web3Service);
};

export default function ProviderWeb3Service({ children }) {
  const auth = AccountETH();
  return <web3Service.Provider value={auth}>{children}</web3Service.Provider>;
}

function AccountETH() {
  const web3 = useRef();

  const [providers, setProviders] = useLocalStorage(
    "providers",
    defaultProvider
  );

  const create = () => {
    const account = getWeb3().eth.accounts.create();
    return account;
  };

  const sendTx = async ({ toAddress, value, gasLimit, account }) => {
    console.log(account.address);
    const myAddress = account.address; //TODO: replace this address with your own public address

    const nonce = await getWeb3().eth.getTransactionCount(myAddress, "latest");

    const transaction = {
      to: toAddress, // faucet address to return eth
      value: ethers.utils.parseUnits(value, "ether"),
      gasLimit: ethers.utils.hexlify(gasLimit < gasLimitDefault? gasLimitDefault : gasLimit),
      nonce: nonce,
      // optional data field to send message or execute smart contract
    };
    // console.log(gasLimit ? gasLimit : gasLimitDefault);

    const signedTx = await web3.current.eth.accounts.signTransaction(
      transaction,
      account.privateKey
    );

    web3.current.eth.sendSignedTransaction(
      signedTx.rawTransaction,
      function (error, hash) {
        if (!error) {
          console.log(
            "🎉 The hash of your transaction is: ",
            hash,
            "\n Check Alchemy's Mempool to view the status of your transaction!"
          );
        } else {
          console.log(
            "❗Something went wrong while submitting your transaction:",
            error
          );
        }
      }
    );
  };

  const getTransactionLogAccount = async (address) => {
    const _web3 = getWeb3();
    const currentBlock = _web3.eth.getBlockNumber();
    //const block = await getWeb3().eth.getBlock(12188971).then(console.log);
    return await axios
      .get(
        GetTxListApi({
          provider: getSelectedProvider(),
          address: address,
          startBlock: 0,
          endBlock: currentBlock,
        })
      )
      .then((res) => {
        return (res.data.result);
      });
  };

  const setDefaultAccount = (address) => {
    getWeb3().defaultAccount = address;
  };

  const getLinkCheckAccountInEtherscan = () => {
    const provider = getSelectedProvider();
    if(provider.name === "mainnet")
      return "https://etherscan.io/address/";
    else 
      return "https://" + provider.name + ".etherscan.io/address/";
  }

  const getDefaultAccount = () => {
    return getWeb3().defaultAccount;
  };

  const getSelectedProvider = () => {
    let _selected = null;
    providers.map((provider) => {
      if (provider.selected) _selected = provider;
    });

    return _selected;
  };

  const addProvider = ({ provider: _providerUrl, name: _name }) => {
    setProviders([
      ...providers,
      {
        key: providers.length + 1,
        providerUrl: _providerUrl,
        name: _name,
        selected: false,
      },
    ]);
  };

  const switchProvider = (providerUrl) => {
    let newProvider = providers.map((provider) => {
      if (provider.providerUrl === providerUrl) {
        return setSelectProvider({
          provider: provider,
          isSelect: true,
        });
      } else {
        return setSelectProvider({
          provider: provider,
          isSelect: false,
        });
      }
    });
    setProviders(newProvider);
    //console.log("it work");
  };

  const setSelectProvider = ({ provider: _provider, isSelect: value }) => {
    return {
      key: _provider.key,
      providerUrl: _provider.providerUrl,
      name: _provider.name,
      selected: value,
    };
  };

  const getWeb3 = () => {
    web3.current = web3.current ? web3.current : new Web3(getSelectedProvider().providerUrl);
    return web3.current;
  };

  const getBalance = async (address) => {
    var balance = await getWeb3().eth.getBalance(address); //Will give value in.
    balance = getWeb3().utils.fromWei(String(balance));
    return balance.toString();
  };

  const getGasPrice = async () => {
    var price = await getWeb3().eth.getGasPrice(); //Will give value in.
    price = getWeb3().utils.fromWei(String(price));
    return price;
  }

  const calGasPrice = async (maxGas) => {
    var price = await getWeb3().eth.getGasPrice(); //Will give value in.
    price = BigNumber.from(String(price)).mul(BigNumber.from(String(maxGas)));
    console.log(price);
    price = getWeb3().utils.fromWei(String(price));
    console.log(price);
    return price.toString();
  };

  useEffect(() => {
    console.log("init web3provider");
    web3.current = new Web3(getSelectedProvider().providerUrl);
  }, [])

  useEffect(() => {
    console.log("change web3provider");
    web3.current.currentProvider.disconnect();
    web3.current = new Web3(getSelectedProvider().providerUrl);
  }, [providers])

  return {
    providers,
    web3,
    create,
    getBalance,
    addProvider,
    getLinkCheckAccountInEtherscan,
    switchProvider,
    getSelectedProvider,
    setDefaultAccount,
    getDefaultAccount,
    sendTx,
    getGasPrice,
    calGasPrice,
    getTransactionLogAccount,
  };
}
