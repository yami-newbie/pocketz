import { toBuffer, isValidPrivate } from "ethereumjs-util";
import * as React from "react";
import { useRef, useState } from "react";
import Wallet from "ethereumjs-wallet";
import { useListAccount } from "../../serviceData/listAccount";
import Header from "../AppHeader";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  MenuItem,
  Button,
  Stack,
  Dialog,
  DialogContent,
} from "@mui/material";

function ImportAccount(props) {
  const {onClose, open} = props;
  const [privateKey, setPrivateKey] = useState(null);
  const inputFile = useRef(null);
  const listAcc = useListAccount();
  let navigate = useNavigate();
  const [way, setWay] = useState("key");
  const [warning, setWarning] = useState(null);

  const _onchange = (e) => {
    var _file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsText(_file);
  };

  const handleClose = () => {
    onClose();
  }

  const submit = () => {
    try {
      if (way === "key") {
        addWithPrivateKey(privateKey);
      }
      onClose();
    } catch (e) {
      setWarning(e.message);
      console.log(e);
    }
  };
  const addHexPrefix = (str) => {
    if (typeof str !== "string" || str.match(/^-?0x/u)) {
      return str;
    }

    if (str.match(/^-?0X/u)) {
      return str.replace("0X", "0x");
    }

    if (str.startsWith("-")) {
      return str.replace("-", "-0x");
    }

    return `0x${str}`;
  };
  const ways = [
    {
      value: "key",
      label: "Private key",
    },
    {
      value: "json",
      label: "JSON",
    },
  ];
  const handleChange = (event) => {
    setWay(event.target.value);
  };
  const addWithPrivateKey = (privateKey) => {
    const prefixed = addHexPrefix(privateKey); // toBuffer(privateKey)
    const buffer = toBuffer(prefixed);
    const value = isValidPrivate(buffer);
    if (!value) return false;
    const wallet = Wallet.fromPrivateKey(buffer);

    listAcc.importAccount({
      username: "",
      address: wallet.getAddressString(),
      privateKey: wallet.getPrivateKeyString(),
    });
  };
  return (
    // <div className="centered-item">
    //   <div style={{ width: "400px" }}>
    //     <Header />
    //   </div>
      <Dialog onClose={handleClose} open ={open} PaperProps={{ style: { borderRadius: "1rem" } }}>
        <DialogContent>
          <Typography variant="h5" component="div">
            Import Account
          </Typography>
          <Divider />
          <Stack
            sx={{ justifyContent: "space-around", mt: "20px" }}
            direction="row"
          >
            <Typography
              variant="body2"
              gutterBottom
              component="div"
              sx={{ marginTop: "10px" }}
            >
              Loại:
            </Typography>

            <TextField
              sx={{ m: "0px 10px" }}
              id="outline-selected-type"
              fullWidth
              size="small"
              select
              value={way}
              onChange={handleChange}
            >
              {ways.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          {way === ways[1].value ? (
            <input
              style={{ marginTop: "20px", marginLeft: "20px" }}
              type="file"
              ref={inputFile}
              onChange={(e) => {
                _onchange(e);
              }}
            />
          ) : (
            <div>
              <div
                style={{
                  marginLeft: "10px",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="p" component="div">
                  Nhập khóa riêng tư của bạn ở đây:
                </Typography>
              </div>
              <div className="centered-item-10px-top">
                <TextField
                  type="password"
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setPrivateKey(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          <Stack
            sx={{ justifyContent: "space-around", mt: "30px" }}
            direction="row"
          >
            <Button
              sx={{ width: "40%", borderRadius: "100px" }}
              onClick={handleClose}
              variant="outlined"
            >
              Hủy
            </Button>
            <Button
              sx={{ width: "40%", borderRadius: "100px" }}
              onClick={submit}
              variant="contained"
            >
              Xác nhận
            </Button>
          </Stack>
          {warning ? (
            <div className="warning-content">
              <div className="warning-text">{warning}</div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    // </div>
  );
}

export default ImportAccount;
