import { Button, Card, CardContent, CardHeader, Box } from '@mui/material'
import React from 'react'
import { IconButton, Divider, Tabs, Tab } from '@mui/material'
import { TabList, TabContext, TabPanel  } from '@mui/lab';
import MoreVertIcon from '@mui/icons-material/Menu';
import { red } from '@mui/material/colors';

export default function MainLayout() {
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div>
        <Card sx={{ minWidth: 345 }}>
            <CardHeader
                title = "Text"
                subheader = "text"
                action={
                    <>
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    </>
                }
            />
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
