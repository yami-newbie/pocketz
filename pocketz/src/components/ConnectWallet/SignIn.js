import { useEffect, useState } from "react";
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
  const [err, setErr] = useState();

  const login = async () => {
    try {
      if (wallet.wallet.password !== "")
        if (wallet.signin(password)) navigate("/");
        else {
          setErr("Mật khẩu không đúng");
        }
    } catch (e) {
      console.log("sai mat khau");
    }
  };

  useEffect(() => {
    if(wallet.wallet.isLogin){
      navigate("/")
    }
  }, [wallet])

  return (
    <div className="centered-container">
      <div>
        <Card sx={{ width: "400px", minWidth: "400px", height: "420px" }}>
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
              error={err ? true : false}
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
            <Typography
              sx={{
                cursor: "pointer",
                color: "#1976d2",
                "&:hover": { color: "#1565c0" },
              }}
              variant="body1"
              onClick={() => {
                navigate("/restore-vault");
              }}
            >
              {"Quên mật khẩu?"}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SignIn;
