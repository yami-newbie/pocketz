import {
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccDetail from "../AccountDetails/AccDetail";
import { useListAccount } from "../../serviceData/listAccount";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useWeb3Service } from "../../serviceData/accountETH";

export default function SendConfirm({ Account, setShow, amount }) {
  const listAcc = useListAccount();
  const web3 = useWeb3Service();
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState(21000);
  const [gasPrice, setGasPrice] = useState();
  const [provider, setProvider] = useState();
  const acc = listAcc.getSelectedAccount();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (web3 && web3.getSelectedProvider()) {
      setProvider(web3.getSelectedProvider());
    }
  }, [web3]);

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
          Chỉnh sửa
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
        <div style={{padding:'40px'}}>
          <Typography variant='caption' gutterBottom>
            Gửi
          </Typography>
          <Typography variant="h6" gutterBottom>
            {amount} {provider?.symbol}
          </Typography>
        </div>
        <Divider />
        <div className="send-content">
          <Typography variant="subtitle1" gutterBottom>
            Phí Gas(tạm tính): 
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {gasPrice}
          </Typography>
        </div>
        <Divider />
        <div className="send-content">
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Tổng: 
            </Typography>
            <Typography variant="caption" gutterBottom>
              Số lượng + phí gas
            </Typography>
          </div>
          <Typography variant="subtitle1" gutterBottom>
            {Number(amount) + Number(gasPrice)}
          </Typography>
        </div>
        <Divider />
        <div style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
          <Stack sx={{ width: "90%" }} direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/");
              }}
              sx={{ width: "50%", borderRadius: "100px" }}
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
              sx={{ width: "50%", borderRadius: "100px" }}
            >
              Confirm
            </Button>
          </Stack>
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
