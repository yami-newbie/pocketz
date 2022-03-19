import { Button, Card, CardContent, CardHeader, Box } from '@mui/material'
import React from 'react'
import { IconButton, Divider, Tabs, Tab, Menu, MenuItem, Typography } from '@mui/material'
import { TabList, TabContext, TabPanel  } from '@mui/lab';
import MoreVertIcon from '@mui/icons-material/Menu';
import { red } from '@mui/material/colors';

export default function MainLayout() {
    const [value, setValue] = React.useState(0);

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div>
        <Card sx={{ minWidth: 345 }}>
            <CardHeader
                title = "Text"
                subheader = "text"
                action={
                    <>
                        <IconButton aria-label="settings"
                        onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
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
