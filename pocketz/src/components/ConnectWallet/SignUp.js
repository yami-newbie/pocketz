import { useEffect, useState } from "react";
import { Card, CardContent, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useWallet } from "../../serviceData/walletAccount";
import { useNavigate } from "react-router";

function SignUp() {
  let navigate = useNavigate();
  const wallet = useWallet();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if(wallet.wallet?.isLogin){
      return navigate("/")
    }
  }, [wallet])

  const signUp = async () => {
    if (password !== "" && confirmpassword !== "") {
      if(password === confirmpassword) {
        wallet.signup(password);
      }
    }
  };
  return (
    <div className = "centered">
      <Card sx={{ maxWidth: 275 }}>
        <CardContent>
          <TextField
            onChange = {(e) => {
              setPassword(e.target.value);
            }}
            label="Password"
            variant="standard"
            type="password"/><br/><br/>
          <TextField
            onChange = {(e) => {
              setConfirmPassword(e.target.value);
            }}
            label="Confirm password"
            variant="standard"
            type="password"/><br/><br/>
          <Button
            variant="contained"
            onClick={signUp}
          >Sign up</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;
