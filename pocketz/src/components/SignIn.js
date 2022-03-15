import { useContext, useState } from "react";
import { UserContext } from "../service/UserContext";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
function SignIn() {
  const [password, setPassword] = useState("");
  const { wallet, setWallet } = useContext(UserContext);

  const login = () => {
    try {
      if (wallet.password !== "") {
        console.log("it here");
        if (wallet.password === password) {
          setWallet({
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
    <form onSubmit={login}>
      <TextField 
        id="standard-basic"
        label="Password"
        variant="standard" 
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      /><br/><br/>
      <Button variant="contained">Unlock</Button>
    </form>
  );
}

export default SignIn;
