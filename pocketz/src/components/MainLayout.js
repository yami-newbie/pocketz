import {  Card, CardContent } from '@mui/material';
import React from 'react';
import { Divider, Tabs, Tab } from '@mui/material';
import AppMenu from './AppMenu';

export default function MainLayout(Account) {
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        <Card sx={{ minWidth: 345 }}>
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
  )
}
