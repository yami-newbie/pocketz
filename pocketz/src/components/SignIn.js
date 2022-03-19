import { useState } from "react";
import { CardContent, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { useAuth } from "../serviceData/walletAccount";
import { useNavigate } from "react-router-dom";

function SignIn() {
  let navigate = useNavigate();

  const [password, setPassword] = useState("");
  const auth = useAuth();

  const login = async () => {
    try {
      if (auth.wallet.password !== "")
        if(auth.signin(password))
          navigate("/");
    } catch (e) {
      if(e === "password not true"){
        //console.log("sai mat khau")
      }
    }
  };
  
  return (
    <div>
      <Card sx={{ maxWidth: 300 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Welcome back
          </Typography>
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button onClick={login} variant="contained">
            Unlock
          </Button>
        </CardContent>
      </Card>
    </div>
    // <form onSubmit={login}>
    //   <TextField
    //     id="standard-basic"
    //     label="Password"
    //     variant="standard"
    //     type="password"
    //     onChange={(e) => {
    //       setPassword(e.target.value);
    //     }}
    //   /><br/><br/>
    //   <Button variant="contained">Unlock</Button>
    //   <Card variant="outlined">{card}</Card>
    // </form>
  );
}

export default SignIn;
