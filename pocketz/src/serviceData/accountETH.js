import { BigNumber, ethers } from "ethers";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";
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
    chainId: 3,
  },
  {
    key: 2,
    providerUrl:
      "wss://mainnet.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "mainnet",
    chainId: 1,
  },
  {
    key: 3,
    providerUrl: "wss://kovan.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "kovan",
    chainId: 42,
  },
  {
    key: 4,
    providerUrl:
      "wss://rinkeby.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "rinkeby",
    chainId: 4,
  },
  {
    key: 5,
    providerUrl:
      "wss://goerli.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "goerli",
    chainId: 1,
  },
  {
    key: 6,
    providerUrl:
      "wss://palm-mainnet.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "palm-mainnet",
    chainId: 1,
  },
  {
    key: 7,
    providerUrl:
      "wss://palm-testnet.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647",
    selected: false,
    name: "palm-testnet",
    chainId: 1,
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
  const pendingHash = useRef();

  const [providers, setProviders] = useLocalStorage(
    "providers",
    defaultProvider
  );

  const create = async () => {
    return await getWeb3().eth.accounts.create();
  };

  //#region tx

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
          pendingHash.current = hash;
          console.log(
            "🎉 The hash of your transaction is: ",
            hash,
            "\n Check Alchemy's Mempool to view the status of your transaction!\n",
            "https://ropsten.etherscan.io/tx/" + hash
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

  const getPendingTransactions = async (address) => {
    const _web3 = getWeb3();

    if (pendingHash.current){
      console.log("work?");
      await _web3.eth.getTransaction(pendingHash.current).then(console.log);
    }
    //_web3.eth
    // .subscribe("pendingTransactions", function (error, result) {
    //   if (!error) console.log(result);
    // })
    // .on("data", function (transaction) {
    //   console.log(transaction);
    // });
  };

  //#endregion

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

  const getSelectedProvider = useCallback(() => {
    let _selected = null;
    providers.map(
      (provider) => (_selected = provider.selected ? provider : _selected)
    );
    return _selected;
  })

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
    setProviders(
      providers.map((provider) => ({
        ...provider,
        selected: provider.providerUrl === providerUrl,
      }))
    );
  };

  const getWeb3 = () => {
    if(web3.current){
      return web3.current
    }
    else{
      connectWS(getSelectedProvider().providerUrl);
    }
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
    price = getWeb3().utils.fromWei(String(price));
    return price.toString();
  };

  const connectWS = (providerUrl) => {
    const _web3 = new Web3(providerUrl);
    _web3.currentProvider.on("error", (e) => console.error("WS Error", e));
    web3.current = _web3;
  };

  useEffect(() => {
    console.log("init web3provider");
    connectWS(getSelectedProvider().providerUrl);
  }, [])

  useEffect(() => {
    console.log("change web3provider");
    web3.current.currentProvider.disconnect();
    connectWS(getSelectedProvider().providerUrl);
  }, [getSelectedProvider])

  return {
    providers,
    web3,
    pendingHash,
    create,
    getBalance,
    getLinkCheckAccountInEtherscan,
    switchProvider,
    getSelectedProvider,
    setDefaultAccount,
    getDefaultAccount,
    sendTx,
    getGasPrice,
    calGasPrice,
    getTransactionLogAccount,
    getPendingTransactions,
  };
}
