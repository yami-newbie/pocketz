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
          <Card sx={{ width: "400px", minWidth:"400px", height: "420px" }}>
            <CardContent>
              <div className="greetings">
                <Typography variant="h4" component="div">
                  Chào mừng
                </Typography>
                <br />
                <Typography variant="h5" component="div">
                  Chào mừng đến với Pocketz
                </Typography>
              </div>

              <TextField
                id="fullWidth"
                label="Mật khẩu"
                variant="standard"
                type="password"
                sx={{ width: "400px", maxWidth: "100%" }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <div className="button">
                <Button onClick={login} variant="contained">
                  Mở khóa
                </Button>
              </div>
              <Typography variant="body1" onClick={()=>{
                navigate("/restore-vault");
              }}>
                {"Quên mật khẩu?"}
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default SignIn;
