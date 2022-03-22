import {  Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Divider, Tabs, Tab } from '@mui/material';
import { useWeb3Service } from "../serviceData/accountETH";
import AppMenu from "./AppMenu";
import { useNavigate } from 'react-router';

export default function MainLayout({Account}) {
    const [value, setValue] = useState(0);
    const [balance, setBalance] = useState(0);
    const web3 = useWeb3Service();
    let navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const load = async () => {
      const bal = Account ? await web3.getBalance(Account.account.address) : 0;
      setBalance(bal);
    };
    load();
  }, [Account]);

  

  return (
    <div className='centered'>
        <Card sx={{ width: 345 }}>
            <AppMenu/>
            <CardContent>
                <Divider />
                <div style = {{ display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', height: '40vh'}}>
                    <h4>
                        text
                    </h4>
                    <h5>
                        text
                    </h5>
                </div>
                
                <Divider />
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    >
                    <Tab label="Item One"  />
                    <Tab label="Item Two"  />
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}
