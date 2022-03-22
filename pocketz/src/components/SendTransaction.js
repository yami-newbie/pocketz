import { useEffect, useState } from "react";
import { useWeb3Service } from "../serviceData/accountETH";
import { useListAccount } from "../serviceData/listAccount";

function SendTransaction() {
    const [address, setAddress] = useState("");
    const [value, setValue] = useState("");
    const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState("");
    const web3 = useWeb3Service();
    const listAccount = useListAccount();
    const [account, setAccount] = useState(null);

    useEffect(() => {
      const init = () => {
        setAccount(listAccount.getSelectedAccount().account);
      }
      init();
    })

    return (
      <div>
        <div className="input-center">
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Value"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Max priority fee per gas"
            onChange={(e) => {
              setMaxPriorityFeePerGas(e.target.value);
            }}
          />
        </div>
        {/* <button onClick={() => {web3.sendTx()}}> SendTx</button> */}

        <button
          className="send-center"
          onClick={() => {
            //console.log(account.getSelectedAccount())
            web3.sendTx({
              account: account,
              toAddress: address,
              value: value,
              gasLimit: maxPriorityFeePerGas,
            });
          }}
        >
          SendTransaction
        </button>
      </div>
    );
}

export default SendTransaction;