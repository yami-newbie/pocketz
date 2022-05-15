import { BigNumber, ethers } from "ethers";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import useEncryptStorage from "../hooks/useEncryptStorage";
import useLocalStorage from "../hooks/useLocalStorage";
import { GetTxListApi } from "./apiRequest";
import { INFURA_API_KEY } from './providers'
var Web3 = require("web3");
const axios = require("axios");

export const defaultProvider = [
  {
    key: 1,
    // rpc: `wss://ropsten.infura.io/ws/v3/${INFURA_API_KEY}`,
    rpc: `wss://ropsten.infura.io/ws/v3/${INFURA_API_KEY}`,
    selected: true,
    faucets: "https://faucet.ropsten.be?${ADDRESS}",
    symbol: "ETH",
    name: "ropsten",
    chainId: 3,
    blockExplorerURL: "https://ropsten.etherscan.io",
  },
  {
    key: 2,
    // rpc: `wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}`,
    rpc: `wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}`,
    selected: false,
    symbol: "ETH",
    faucets: "",
    name: "mainnet",
    chainId: 1,
    blockExplorerURL: "https://etherscan.io",
  },
  {
    key: 3,
    // rpc: `wss://kovan.infura.io/ws/v3/${INFURA_API_KEY}`,
    rpc: `wss://kovan.infura.io/ws/v3/${INFURA_API_KEY}`,
    selected: false,
    faucets: "http://fauceth.komputing.org?chain=42&address=${ADDRESS}",
    symbol: "ETH",
    name: "kovan",
    chainId: 42,
    blockExplorerURL: "https://kovan.etherscan.io",
  },
  {
    key: 4,
    // rpc: `wss://rinkeby.infura.io/ws/v3/${INFURA_API_KEY}`,
    rpc: `wss://rinkeby.infura.io/ws/v3/${INFURA_API_KEY}`,
    selected: false,
    symbol: "ETH",
    faucets: "http://fauceth.komputing.org?chain=4&address=${ADDRESS}",
    name: "rinkeby",
    chainId: 4,
    blockExplorerURL: "https://rinkeby.etherscan.io",
  },
  {
    key: 5,
    // rpc: `wss://goerli.infura.io/ws/v3/${INFURA_API_KEY}`,
    rpc: `wss://goerli.infura.io/ws/v3/${INFURA_API_KEY}`,
    selected: false,
    symbol: "ETH",
    faucets: "http://fauceth.komputing.org?chain=5&address=${ADDRESS}",
    name: "goerli",
    chainId: 5,
    blockExplorerURL: "https://goerli.etherscan.io",
  },
  {
    key: 6,
    // rpc: `wss://palm-mainnet.infura.io/ws/v3/${INFURA_API_KEY}`,
    rpc: `wss://palm-mainnet.infura.io/ws/v3/${INFURA_API_KEY}`,
    selected: false,
    faucets: "",
    symbol: "ETH",
    name: "palm-mainnet",
    chainId: 11297108109,
    blockExplorerURL: "https://explorer.palm.io",
  },
  {
    key: 7,
    // rpc: `wss://palm-testnet.infura.io/ws/v3/${INFURA_API_KEY}`,
    rpc: `wss://palm-testnet.infura.io/ws/v3/${INFURA_API_KEY}`,
    selected: false,
    faucets: "",
    symbol: "ETH",
    name: "palm-testnet",
    chainId: 11297108099,
    blockExplorerURL: "https://explorer.palm-uat.xyz",
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
  const [wallet, setWallet, setPassword] = useEncryptStorage("wallet", {});

  const [providers, setProviders] = useState(defaultProvider)
  // useLocalStorage(
  //   "providers",
  //   defaultProvider
  // );

  const create = async () => {
    return await getWeb3().eth.accounts.create();
  };

  //#region tx

  const sendTx = async ({ toAddress, value, gasLimit, account }) => {
    console.log(account.address);
    const provider = getSelectedProvider();
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
            `${provider.blockExplorerURL}/tx/` + hash
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
    const currentProvider = getSelectedProvider();

    if (
      defaultProvider.filter(
        (provider) => provider.chainId === currentProvider.chainId
      ).length > 0
    ) {
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
          return res.data.result;
        });
    }
    else {

    }

    
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
    console.log(provider);
    return `${provider.blockExplorerURL}/address/`;
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

  const addProvider = ({
    name,
    rpc,
    chainId,
    faucets,
    symbol,
    blockExplorerURL,
  }) => {
    setProviders([
      ...providers,
      {
        key: providers.length + 1,
        name: name,
        selected: false,
        rpc: rpc,
        symbol: symbol,
        chainId: chainId,
        faucets: faucets,
        blockExplorerURL: blockExplorerURL,
      },
    ]);
  };

  const switchProvider = (rpc) => {
    console.log(rpc);
    setProviders(
      providers.map((provider) => ({
        ...provider,
        selected: provider.rpc === rpc,
      }))
    );
  };

  const getWeb3 = () => {
    if(web3.current){
      return web3.current
    }
    else{
      connectWS(getSelectedProvider().rpc);
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

  const connectWS = (rpc) => {
    const _web3 = new Web3(rpc);
    web3.current = _web3;
  };

  useEffect(() => {
    console.log("init web3provider");
    connectWS(getSelectedProvider()?.rpc);
  }, [])

  useEffect(() => {
    try {
      setWallet({
        ...wallet,
        providers: providers
      })
    }
    catch (err){
      console.log(err)
    }
  }, [providers])

  useEffect(() => {
    console.log("change web3provider");
    web3.current.currentProvider.disconnect();
    connectWS(getSelectedProvider()?.rpc);
  }, [getSelectedProvider])

  return {
    providers,
    web3,
    pendingHash,
    setWallet,
    setPassword,
    wallet,
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
    addProvider,
  };
}
