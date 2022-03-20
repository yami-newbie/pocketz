import Web3 from 'web3'
let web3 = new Web3(
  "wss://ropsten.infura.io/ws/v3/81e128eacb6e432c8ab08ff0d9c62647"
);

class AccountDataService {
  create = () => {
    const account = web3.eth.accounts.create();
    return account;
  };

  getLibrary = (provider) => {
    web3 = new Web3(provider);
    return web3;
  }

  getBalance = async (address) => {
    var balance = await web3.eth.getBalance(address); //Will give value in.
    balance = web3.utils.fromWei(String(balance));
    console.log(balance);
    return balance.toString();
  }
}

export default new AccountDataService();