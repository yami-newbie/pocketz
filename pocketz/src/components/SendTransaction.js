import { CardContent, Card, TextField, Button } from "@mui/material";
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
      <div className="centered-container">
        <Card sx={{ maxWidth: 275 }}>
          <CardContent>
            <div className="centered-item-10px-topbot">
              <TextField id="outlined-basic" label="Address" variant="outlined" onChange={(e) => {
                  setAddress(e.target.value);
                }}/>
            </div>
            <div className="centered-item-10px-bot">
              <TextField id="outlined-basic" label="Value" variant="outlined" onChange={(e) => {
                  setValue(e.target.value);
                }}/>
            </div>
            <div className="centered-item-10px-bot">
              <TextField id="outlined-basic" label="Max priority fee per gas" variant="outlined" onChange={(e) => {
                  setMaxPriorityFeePerGas(e.target.value);
                }}/>
            </div>
            <div className="double-item-10px-bot">
              <Button variant="outlined">Cancel</Button>
              <Button variant="contained" onClick={() => {
                // console.log(account.getSelectedAccount())
                console.log("send send")
                web3.sendTx({
                  account: account,
                  toAddress: address,
                  value: value,
                  gasLimit: maxPriorityFeePerGas,
                });
              }}>
                Send
              </Button>
            </div>
          </CardContent>
          {/* <button onClick={() => {web3.sendTx()}}> SendTx</button> */}
        </Card>
      </div>
    );
}

export default SendTransaction;