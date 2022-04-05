import React from 'react'
import { TextField, List, ListItemText } from '@mui/material'
import { ListItem, ListItemButton, Divider } from '@mui/material'
import { useListAccount } from '../serviceData/listAccount'
import { useEffect, useState } from "react";
import { InputAdornment, Card } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SendMainAlt from './SendMainAlt'
import { useNavigate } from 'react-router';

export default function SendMain() {
  const listAcc = useListAccount();
  const [sortName, setSortName] = useState("");
  const [valueSort, setValueSort] = useState(listAcc.accounts);
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
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
  return (
    <div className='centered-container'>
      <div>
        <div className='search-container'>
          <TextField id="outlined-search" type="search"
            sx={{ width: '95%', bgcolor: 'gray' }} InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }} />
        </div>
        <div className='centered-item-10px-top'>
          <Card sx={{ width: '100%', maxWidth: '360px', bgcolor: 'background.paper', height: '60vh' }}>
            <List sx={{ width: '360px' }}>
              {
                listAcc.accounts.map((acc) => {
                  return (
                    <div>
                      <ListItem disablePadding onClick = {() => {navigate("./mainalt")}}>
                        <ListItemButton>
                          <ListItemText primary={acc.username} />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </div>
                  )
                })
              }
            </List>
          </Card>
        </div>
      </div>
    </div>
  )
}
