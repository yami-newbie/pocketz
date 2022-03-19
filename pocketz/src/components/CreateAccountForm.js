import useLocalStorage from "../hooks/useLocalStorage";
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import accountDataService from '../service/account'
import Button from '@mui/material/Button'
import { CardContent, TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Card } from "@mui/material";

function CreateAccountForm() {
    const [username, setUsername] = useState("");
    const [key, setKey] = useLocalStorage("key", 0);
    const [count, setCount] = useLocalStorage("count", 0);
    const [account, setAccount] = useLocalStorage("listAccount", []);

    const createAccount = async () => {
        const _key = key;
        setKey(_key + 1);
        if(username === "")
            setCount(count + 1);
        try {
            const acc = await accountDataService.create({
              key: key,
              username: username === "" ? "Account " + count : username,
            });
            console.log("account");
            setAccount([...account, acc]);
        } catch (e) {
            console.log(e);
        }
        if(username !== "")
            setUsername("");
    };
    return (
      // <div>
      //   <form onSubmit={createAccount}>
      //     <FormControl sx={{ width: '25ch' }}>
      //       <OutlinedInput placeholder="Username" />
      //     </FormControl><br/><br/>
      //     <Button variant="outlined">Cancel</Button>&nbsp;&nbsp;&nbsp;&nbsp;
      //     <Button variant="contained">Create</Button>
      //   </form>
      // </div>
      <div>
        <Card sx={{ maxWidth: 275 }}>
          <CardContent>
            <OutlinedInput placeholder="Username"/>
            <Button variant="outlined">Cancel</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button 
              variant="contained"
              onClick={createAccount}>
                Create
            </Button>
          </CardContent>
        </Card>
      </div>
      
    );
}

export default CreateAccountForm;