import { useEffect, useState } from "react";
import { Card, CardContent, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useAuth } from "../serviceData/walletAccount";
import { useNavigate } from "react-router";

function SignUp() {
  let navigate = useNavigate();
  const wallet = useAuth();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if(!wallet.wallet){
      return navigate("/")
    }
  })

  const signUp = async () => {
    if (password !== "" && confirmpassword !== "") {
      if(password === confirmpassword) {
        wallet.signup(password);
        navigate("/");
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
      <Card sx={{ maxWidth: 275 }}>
        <CardContent>
          <TextField
            onChange = {(e) => {
              setPassword(e.target.value);
            }}
            id="standard-basic"
            label="New password"
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
