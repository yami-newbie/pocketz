import { useState } from "react";
import { CardContent, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { Typography, Link } from "@mui/material";
import { useWallet } from "../../serviceData/walletAccount";
import { useNavigate } from "react-router-dom";

function SignIn() {
  let navigate = useNavigate();

  const [password, setPassword] = useState("");
  const wallet = useWallet();

  const login = async () => {
    try {
      if (wallet.wallet.password !== "")
        if (wallet.signin(password)) navigate("/");
    } catch (e) {
      if (e === "password not true") {
        //console.log("sai mat khau")
      }
    }
  };

  return (
    <div className="centered-container">
      {wallet.wallet.isLogin ? (
        <button onClick={() => wallet.signout()}>Sign Out</button>
      ) : (
        <div>
          <Card sx={{ width: "400px", minWidth:"400px" }}>
            <CardContent>
              <div className="centered-item-40vh">
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
                sx={{ width: "400px", maxWidth: "100%" }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <div className="centered-item-10vh">
                <Button onClick={login} variant="contained">
                  Unlock
                </Button>
              </div>
              <a>Or </a>
              <Link href="#" underline="hover">
                {"Link"}
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default SignIn;
