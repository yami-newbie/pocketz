import { Avatar } from '@mui/material'
import { Box } from '@mui/system'
import AppMenu from './AppMenu';
import React, { useState } from "react";

function Header()
{
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    
    return (
      <div>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div className="icon-header">
            <img src="favicon.ico" alt="pocketz logo" />
          </div>
          <div className="avatar-header">
            <Avatar onClick={handleOpenUserMenu}>H</Avatar>
            <AppMenu state={anchorElUser} onClose={handleCloseUserMenu}/>
          </div>
        </Box>
      </div>
    );
}

export default Header;