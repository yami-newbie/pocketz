import { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { UserContext } from "../service/UserContext";
import { Card, CardContent, TextField } from "@mui/material";
import { Button } from "@mui/material";

function SignUp() {
  const [wallet, setWallet] = useLocalStorage("wallet", {});

  const [password, setPassword] = useState("");

  const signUp = async () => {
    if (password !== "") {
      await setWallet({
        password: password,
        isLogin: true,
      });
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
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        <TextField
          id="standard-basic"
          label="New password"
          variant="standard"
          type="password"/><br/><br/>
        <TextField
          id="standard-basic"
          label="Confirm password"
          variant="standard"
          type="password"/><br/><br/>
        <Button
          variant="contained"
          onClick={(e) => {
            setPassword(e.target.value);
          }}
        >Sign up</Button>
      </CardContent>
    </Card>
  );
}

export default SignUp;
