import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button'
import { CardContent } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Card } from "@mui/material";
import { useListAccount } from "../serviceData/listAccount";
import { useNavigate } from "react-router";
import AccountDataService from '../serviceData/accountETH';

function CreateAccountForm() {
    const [username, setUsername] = useState("");
    const listAcc = useListAccount();
    let navigate = useNavigate();

    useEffect(() => {
      return () => {
        setUsername("");
      }
    }, [])

    const createAccount = async () => {
      try {
        const acc = await AccountDataService.create();
        listAcc.importAccount({
          username: username ? username : "",
          address: acc.address,
          privateKey: acc.privateKey,
        });
        navigate("/");
      } catch (e) {
        console.log(e);
      }
      if(username !== "")
          setUsername("");
    };
    return (
      <Card sx={{ maxWidth: 275 }}>
        <CardContent>
          <OutlinedInput onChange={(e) => {setUsername(e.target.value)}} placeholder="Username"/>
          <Button onClick={() => navigate("/")} variant="outlined">Cancel</Button>
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