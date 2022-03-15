import { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { UserContext } from "../service/UserContext";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

function SignUp() {
  const [wallet, setWallet] = useLocalStorage("wallet", {});

  const [password, setPassword] = useState("");

  const signUp = () => {
    if (password !== "") {
      setWallet({
        password: password,
        isLogin: true,
      });
    }
  };
  return (
    <form onSubmit={signUp}>
      <TextField 
        id="standard-basic"
        label="New password"
        variant="standard" 
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      /><br/><br/>
      <TextField 
        id="standard-basic"
        label="Confirm password"
        variant="standard" 
        type="password"
        // onChange={(e) => {
        //   setPassword(e.target.value);
        // }}
      /><br/><br/>
      <Button variant="contained">Sign up</Button>
    </form>
  );
}

export default SignUp;
