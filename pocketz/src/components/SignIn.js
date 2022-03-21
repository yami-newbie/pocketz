import { useState } from "react";
import { CardContent, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { Typography, Link, Box } from "@mui/material";
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
    <div className="centered">
      {auth.wallet.isLogin ? (
        <button onClick={() => auth.signout()}>Sign Out</button>
      ) : (
        <Card sx={{ width: 400, height: 500 }}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                height: "40vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h3" component="div">
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
              sx={{ width: 400, maxWidth: "80%" }}
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
