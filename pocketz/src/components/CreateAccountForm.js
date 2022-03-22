import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button'
import { CardContent } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Card } from "@mui/material";
import { useListAccount } from "../serviceData/listAccount";
import { useNavigate } from "react-router";

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
      <div className="centered-container">
        <Card sx={{ maxWidth: 275 }}>
          <CardContent>
            <div className="centered-item-10px-topbot">
              <OutlinedInput onChange={(e) => {setUsername(e.target.value)}} placeholder="Username"/>
            </div>
            <div className="double-item-10px-bot">
              <Button onClick={() => navigate("/")} variant="outlined">Cancel</Button>
              <Button 
                variant="contained"
                onClick={createAccount}>
                  Create
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
}

export default CreateAccountForm;