import { Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useWeb3Service } from "../serviceData/accountETH";

function SendTransaction() {
    const [address, setAddress] = useState("");
    const [value, setValue] = useState("");
    const [gas, setGas] = useState("");
    const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState("");
    const web3 = useWeb3Service();
    useEffect(() => {
        const init = async () => {
            //web3.eth.getGasPrice();
        }
        init();
    }, [])
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
            placeholder="Gas"
            onChange={(e) => {
              setGas(e.target.value);
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
            web3.sendTx();
          }}
        >
          SendTransaction
        </button>
      </div>
    );
}

export default SendTransaction;