import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccDetail from "./AccDetail";
import { useListAccount } from "../serviceData/listAccount";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useWeb3Service } from "../serviceData/accountETH";

export default function SendConfirm({ Account, setShow, amount }) {
  const listAcc = useListAccount();
  const web3 = useWeb3Service();
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState(21000);
  const [gasPrice, setGasPrice] = useState();
  const [provider, setProvider] = useState();
  const acc = listAcc.getSelectedAccount();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(web3 && web3.getSelectedProvider()){
      setProvider(web3.getSelectedProvider());
    }
  }, [web3])

  useEffect(() => {
    const load = async () => {
      setGasPrice(await web3.calGasPrice(maxPriorityFeePerGas));
    };
    load();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let navigate = useNavigate();

  const getAddressStr = (address) => {
    return address.substr(0, 5) + "..." + address.substr(address.length - 4, 4);
  };

  return (
    <div className="centered-item">
      <Card sx={{ width: "400px" }}>
        <Button size="small" onClick={setShow}>
          Back
        </Button>
        <Divider />
        <div className="double-item">
          <Typography variant="body2" gutterBottom>
            {acc.username}
          </Typography>
          <ArrowForwardIcon />
          <Button variant="text" onClick={handleClickOpen}>
            {Account.username}
          </Button>
        </div>
        <Divider />
        <div className="send-content">
          <Typography variant="h6" gutterBottom>
            Số tiền: {amount} {provider?.symbol}
          </Typography>
        </div>
        <Divider />
        <div className="send-content">
          <Typography variant="h6" gutterBottom>
            Phí Gas(tạm tính): {gasPrice}
          </Typography>
        </div>
        <Divider />
        <div className="send-content">
          <Typography variant="h6" gutterBottom>
            Tổng: {Number(amount) + Number(gasPrice)}
          </Typography>
        </div>
        <Divider />
        <div className="double-item">
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              web3.sendTx({
                account: acc.account,
                toAddress: Account.account.address,
                value: amount,
                gasLimit: maxPriorityFeePerGas,
              });
            }}
            variant="contained"
          >
            Confirm
          </Button>
        </div>
      </Card>
      <AccDetail
        open={open}
        onClose={handleClose}
        account={Account}
      ></AccDetail>
    </div>
  );
}
