import { useContext, useState } from "react";
import { UserContext } from "../service/UserContext";
import { CardContent, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { Typography, Link } from "@mui/material";
import LogOut from "./LogOut";
import { maxHeight } from "@mui/system";
function SignIn() {
  const [password, setPassword] = useState("");
  const { wallet, setWallet } = useContext(UserContext);

  const login = async () => {
    try {
      if (wallet.password !== "") {
        console.log("it here");
        if (wallet.password === password) {
          await setWallet({
            isLogin: true,
            password: wallet.password,
          });
        }
      } else console.log("It null");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div  class = "centered">
      {wallet.isLogin ? (
        <LogOut />
      ) : (
        <Card sx={{ maxWidth: '100%', width: 500}}>
          <CardContent sx={{ maxWidth: '100%', width: 500}}>
            <Typography variant="h3" component="div">
              Welcome back
            </Typography>
            <br/>
            <br/>
            <Typography variant="h5" component="div">
              Welcome to pocketz
            </Typography>
            <br/>
            <br/>
            <br/>
            <br/>
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              type="password"
              property="fullWidth"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br/>
            <br/>
            <Button onClick={login} variant="contained">
              Unlock
            </Button>
            <br/>
            <p>Or</p>&nbsp;
            <Link href="#" underline="hover">
              {'Link'}
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
