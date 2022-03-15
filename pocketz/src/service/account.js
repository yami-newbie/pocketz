import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

class AccountDataService {
  create = ({ key: id, username: name }) => {
    const acc = {
      key: id,
      username: name,
      account: { address: "test acc", privateKey: "test key" }, //web3.eth.accounts.create(),
    };
    return acc;
  };
}

export default new AccountDataService();