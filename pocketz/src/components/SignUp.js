import { useEffect, useState } from "react";
import { Card, CardContent, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useWallet } from "../serviceData/walletAccount";
import { useNavigate } from "react-router";
import Header from "./AppHeader";

function SignUp() {
  let navigate = useNavigate();
  const wallet = useWallet();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if(wallet.wallet.isLogin){
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
    // <form onSubmit={signUp}>
    //   <TextField 
    //     id="standard-basic"
    //     label="New password"
    //     variant="standard" 
    //     type="password"
    //     onChange={(e) => {
    //       setPassword(e.target.value);
    //     }}
    //   /><br/><br/>
    //   <TextField 
    //     id="standard-basic"
    //     label="Confirm password"
    //     variant="standard" 
    //     type="password"
    //     // onChange={(e) => {
    //     //   setPassword(e.target.value);
    //     // }}
    //   /><br/><br/>
    //   <Button variant="contained">Sign up</Button>
    // </form>
    <div className = "centered">
      <div style = {{width: '400px'}}>
            <Header/>
      </div>
      <Card sx={{ maxWidth: 275 }}>
        <CardContent>
          <TextField
            onChange = {(e) => {
              setPassword(e.target.value);
            }}
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"/><br/><br/>
          <TextField
            onChange = {(e) => {
              setConfirmPassword(e.target.value);
            }}
            id="standard-basic"
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
