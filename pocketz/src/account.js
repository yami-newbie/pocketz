
import Web3 from 'web3'

const web3 = new Web3("ws://localhost:8545");

class Account {
    create = async () => {
        return await web3.eth.accounts.create();
    }
}

export default new Account();