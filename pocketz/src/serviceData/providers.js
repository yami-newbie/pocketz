import axios from "axios"
import Web3 from "web3";

const defaultProvider = [1, 3, 4, 5, 42];

export const chainListApi = "https://chainid.network/chains.json";

export const INFURA_API_KEY = "81e128eacb6e432c8ab08ff0d9c62647";



export const getListChain = async () => await axios.get(chainListApi);

export const getInfoProvider = (chainId) => {
    return getListChain().then(res => {
        return res.data.filter((chain) => chain.chainId === chainId);
        // return res.data
    });
}

export const getInfoProviderByRPC = (rpc) => {
    const web3 = new Web3(rpc);
    web3.eth.getChainId().then(console.log);
}

export const checkProvider = (rpc) => {
    try {
        new Web3(rpc);
        return true
    }
    catch (e) {
        return false;
    }
}

export const getChainIdByRpc = (rpc) => {
    try {
        return new Web3(rpc).eth.getChainId().then(res => res);
    }
    catch (e) {
        return "err";
    }
}
