import React from 'react'
import { TextField, List, ListItemText } from '@mui/material'
import { ListItem, ListItemButton, Divider } from '@mui/material'
import { useListAccount } from '../serviceData/listAccount'
import { useEffect, useState } from "react";
import { InputAdornment, Card } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SendMainAlt from './SendMainAlt'
import { useNavigate } from 'react-router';
import SendHeader from './SendHeader';
import Header from './AppHeader';

export default function SendMain() {
  const listAcc = useListAccount();
  const [sortName, setSortName] = useState("");
  const [valueSort, setValueSort] = useState(listAcc.accounts);
  const [show, setShow] = useState(false);
  const [accountSelect, setAccountSelect] = useState();

  useEffect(() => {
    if (sortName !== "") {
      let list = [];
      listAcc.accounts.map((acc) => {
        if (acc.username.toLowerCase().includes(sortName.toLowerCase()))
          list = [...list, acc];
      });
      setValueSort(list);
    } else {
      setValueSort(listAcc.accounts);
    }
  }, [sortName, listAcc]);
  const onSelectAccount = () => {
    setShow(true);
  }
  const onExit = () => {
    setShow(false);
  }

  return (
    <div className="centered-container">
      {!show ? (
        <div>
          <div style = {{width: '400px'}}>
            <Header/>
          </div>
          <Card >
            <SendHeader />
          </Card>
          

          <div className="search-container">
            <TextField
              id="outlined-search"
              onChange={(e) =>{setSortName(e.target.value)}}
              type="search"
              sx={{ width: "95%", marginTop: '10px'}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="centered-item-10px-top">
            <Card
              sx={{
                width: "100%",
                maxWidth: "400px",
                bgcolor: "background.paper",
                height: "60vh",
              }}
            >
              <List sx={{ width: "400px" }}>
                {valueSort.map((acc) => {
                  return (
                    <div>
                      <ListItem
                        disablePadding
                        onClick={() => {
                          setAccountSelect(acc);
                          onSelectAccount();
                          //navigate("./mainalt");
                        }}
                      >
                        <ListItemButton>
                          <ListItemText primary={acc.username} />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
              </List>
            </Card>
          </div>
        </div>
      ) : (
        <SendMainAlt Account={accountSelect} onExit={onExit} />
      )}
    </div>
  );
}
