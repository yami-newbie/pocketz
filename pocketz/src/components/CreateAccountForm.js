import useLocalStorage from "../hooks/useLocalStorage";
import React, { useState } from "react";
import accountDataService from '../serviceData/accountETH'
import Button from '@mui/material/Button'
import { CardContent, TextField } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Card } from "@mui/material";
import { useListAccount } from "../serviceData/listAccount";

function CreateAccountForm() {
    const [username, setUsername] = useState("");
    const [key, setKey] = useLocalStorage("key", 0);
    const [count, setCount] = useLocalStorage("count", 0);
    const listAcc = useListAccount();

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
            listAcc.addAccount(acc);
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
    );
}

export default CreateAccountForm;