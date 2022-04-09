import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button'
import { CardContent, Stack, Typography } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Card } from "@mui/material";
import { useListAccount } from "../serviceData/listAccount";
import { useNavigate } from "react-router";
import Header from './AppHeader'

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
        listAcc.createAccount(username);
        navigate("/");
      } catch (e) {
        console.log(e);
      }
      if(username !== "")
          setUsername("");
    };
    return (
      <div className="centered-item">
        <div style = {{width: '400px'}}>
          <Header/>
        </div>
        <Card sx={{ width: '350px' }}>
          <CardContent>
            <div>
              <Typography variant="body1" gutterBottom>
                Username
              </Typography>
            </div>
            <div className="centered-item-10px-topbot">
              <OutlinedInput onChange={(e) => {setUsername(e.target.value)}} placeholder="Username"/>
            </div>
            
            <Stack sx={{ justifyContent: "space-around", mt: "30px" }}
            direction="row">
              <Button onClick={() => navigate("/")} variant="outlined" sx={{ width: "40%", borderRadius: "100px" }}>Cancel</Button>
              <Button 
                variant="contained"
                sx={{ width: "40%", borderRadius: "100px" }}
                onClick={createAccount}>
                  Create
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </div>
    );
}

export default CreateAccountForm;