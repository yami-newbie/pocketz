import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../AppHeader";
import { useNavigate } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useWallet } from "../../serviceData/walletAccount";
function ForgetPass() {
  const [mnemonic, setMnemonic] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errPass, setErrPass] = useState();
  const [errMne, setErrMne] = useState();

  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  const wallet = useWallet();
  
  useEffect(() => {
    console.log(errPass)
  }, [errPass])

  const handleClickShow = () => {
    setShow(false);
  };
  const handleMonseDown = () => {
    setShow(true);
  };
  const onChangePass = () => {
    try {
      if(newPass === confirmPass){
        wallet.changePass(newPass, mnemonic);
        navigate("/")
      }
      else {
        setErrPass("Mật khẩu xác nhận không chính xác")
      }
    }
    catch (e) {
      if(e === "mnemonic is not true"){
        setErrMne("Cụm Mật Khẩu Khôi Phục Bí Mật không chính xác");
      }
    }
  }
  return (
    <div className="centered-item">
      <div style={{ width: "400px" }}>
        <Header />
      </div>
      <Stack sx={{ width: "70%", backgroundColor:"white"}} spacing={1}>
        <Typography
          onClick={() => {
            navigate("/");
          }}
        >
          {"< Quay lại"}
        </Typography>
        <Typography variant="h3">Reset Wallet</Typography>
        <Typography variant="body1">
          Pocketz does not keep a copy of your password. If you're having
          trouble unlocking your account, you will need to reset your wallet.
          You can do this by providing the Secret Recovery Phrase you used when
          you set up your wallet.
        </Typography>
        <Typography variant="body1">
          This action will delete your current wallet and Secret Recovery Phrase
          from this device, along with the list of accounts you've curated.
          After resetting with a Secret Recovery Phrase, you'll see a list of
          accounts based on the Secret Recovery Phrase you use to reset. This
          new list will automatically include accounts that have a balance.
          You'll also be able to re-add any other accounts created previously.
          Custom accounts that you've imported will need to be re-added, and any
          custom tokens you've added to an account will need to be re-added as
          well.
        </Typography>
        <Typography variant="body1">
          Make sure you're using the correct Secret Recovery Phrase before
          proceeding. You will not be able to undo this.
        </Typography>
        <Typography variant="h5">Cụm Mật Khẩu Khôi Phục Bí Mật</Typography>
        <OutlinedInput
          type={show ? "text" : "password"}
          value={mnemonic}
          error={errMne === "" || typeof errMne === "undefined" ? false : true}
          onChange={(e) => setMnemonic(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onMouseDown={handleMonseDown}
                onMouseUp={handleClickShow}
                edge="end"
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errMne && <div style={{ color: "red" }}>{errMne}</div>}
        <Typography>Mật khẩu mới:</Typography>
        <TextField
          value={newPass}
          type="password"
          onChange={(e) => {
            setNewPass(e.target.value);
          }}
          variant="outlined"
        />
        <Typography>Xác nhận mật khẩu</Typography>
        <TextField
          value={confirmPass}
          error={
            errPass === "" || typeof errPass === "undefined" ? false : true
          }
          type="password"
          helperText={errPass}
          onChange={(e) => {
            setConfirmPass(e.target.value);
          }}
          variant="outlined"
        />
        <Button onClick={onChangePass} variant="contained">
          Khôi phục
        </Button>
      </Stack>
    </div>
  );
}

export default ForgetPass;
