import { useState } from "react";
import { CardContent, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { Typography, Link, Box } from "@mui/material";
import { useWallet } from "../serviceData/walletAccount";
import { useNavigate } from "react-router-dom";


function SignIn() {
  let navigate = useNavigate();

  const [password, setPassword] = useState("");
  const wallet = useWallet();

  const login = async () => {
    try {
      if (wallet.wallet.password !== "")
        if(wallet.signin(password))
          navigate("/");
    } catch (e) {
      if(e === "password not true"){
        //console.log("sai mat khau")
      }
    }
  };
  
  return (
    <div className="centered">
      {wallet.wallet.isLogin ? (
        <button onClick={() => wallet.signout()}>Sign Out</button>
      ) : (
        <Card sx={{ width: 275}} >
          <CardContent>
            <div style = {{ display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', height: '40vh'}}>
              <Typography variant="h4" component="div">
                Welcome back
              </Typography>
              <br />
              <Typography variant="h5" component="div">
                Welcome to pocketz
              </Typography>
            </div>

            <TextField
              id="fullWidth"
              label="Password"
              variant="standard"
              type="password"
              sx = {{ width: 275, maxWidth: '100%' }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "10vh",
              }}
            >
              <Button onClick={login} variant="contained">
                Unlock
              </Button>
            </div>
            <a>Or</a>
            <Link href="#" underline="hover">
              {"Link"}
            </Link>
          </CardContent>
        </Card>
      )}
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
