import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

class AccountDataService {
  create = () => {
    return { address: "address", privateKey: "privateKey" }; //web3.eth.accounts.create();
  };
}

export default new AccountDataService();