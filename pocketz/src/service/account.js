import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

class Account {
    
    create = ({
        key: id,
        username: name,
        state: [state, setState]
    }) => {
        const acc = {
            key: id,
            username: name,
            account: {address: "test acc", privateKey: "test key"}//web3.eth.accounts.create(),
        }
        setState([...state, acc]);
        return acc;
    }
}

export default new Account();