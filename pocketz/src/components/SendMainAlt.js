import {
  Card,
  IconButton,
  Select,
  Typography,
  MenuItem,
  TextField,
  Button,
  Stack,
  CardContent,
} from "@mui/material";
import React, { useEffect } from "react";
import { useListAccount } from "../serviceData/listAccount";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router";
import { useState } from "react";
import SendConfirm from "./SendConfirm";
import { useWeb3Service } from "../serviceData/accountETH";
import Header from "./AppHeader";

export default function SendMainAlt({ Account, onExit }) {
  const listAcc = useListAccount();
  const acc = listAcc.getSelectedAccount();
  let navigate = useNavigate();
  const [money, setMoney] = useState("");
  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState(0);
  const [accountSelect, setAccountSelect] = useState(null);
  const [amount, setAmount] = useState("0");
  const onSelectAccount = () => {
    setShow(true);
  };
  const exit = () => {
    setShow(false);
  };

  const handleChange = (event) => {
    setMoney(event.target.value);
  };
  const buildAddress = (address) => {
    return String(address).substring(0, 10);
  };

  useEffect(() => {
    const load = async () => {
      const balance = listAcc.getBalance(acc.account.address);
      const val = String(balance).substr(0, 8);
      setBalance(val);
    };
    load();
    return () => {
      setBalance(0);
    };
  }, [listAcc.balances.current]);

  return (
    <div className="centered-container" style={{ width: "400px" }}>
      {!show ? (
        <div className="centered-item">
          <div style={{ width: "400px" }}>
            <Header />
          </div>
          <Card sx={{ width: "400px" }}>
            <div>
              <div className="kbietdattengi">
                <div className="margin-left">
                  <Typography variant="body1" gutterBottom>
                    {Account.username}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {Account.account.address}
                  </Typography>
                </div>
                <div className="margin-right">
                  <IconButton onClick={onExit}>
                    <ClearIcon />
                  </IconButton>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="margin-left">
                <Typography variant="body1" gutterBottom>
                  Asset:
                </Typography>
                <div>
                  <Select
                    onChange={handleChange}
                    displayEmpty
                    sx={{ width: "120px" }}
                    defaultValue={1}
                  >
                    <MenuItem value={1}>ETH</MenuItem>
                  </Select>
                  <Typography
                    variant="caption"
                    gutterBottom
                    sx={{ padding: "10px" }}
                  >
                    Balance: {balance} ETH
                  </Typography>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="margin-left">
                <Typography variant="body1" gutterBottom>
                  Amount:
                </Typography>
                <TextField
                  variant="outlined"
                  defaultValue="0"
                  sx={{ width: "95%" }}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>
            </div>

            <div
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Stack sx={{ width: "90%" }} direction="row" spacing={2}>
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                  sx={{ width: "50%", borderRadius: "100px" }}
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  sx={{ width: "50%", borderRadius: "100px" }}
                  variant="contained"
                  onClick={() => {
                    setAccountSelect(Account);
                    onSelectAccount();
                    // navigate("./mainalt");
                  }}
                >
                  Continue
                </Button>
              </Stack>
            </div>
          </Card>
        </div>
      ) : (
        <SendConfirm Account={accountSelect} setShow={exit} amount={amount} />
      )}
    </div>
  );
}
