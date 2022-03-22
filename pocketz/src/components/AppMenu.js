import ListAccount from "./ListAccount";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Button, CardHeader, IconButton, ListItemIcon, MenuList, MenuItem, Typography, Menu, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useListAccount } from "../serviceData/listAccount";
import { useAuth } from "../serviceData/walletAccount";

function AppMenu() {
  let navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const listAccount = useListAccount();
  const selectedAccount = listAccount.getSelectedAccount();
  const auth = useAuth();

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <div>
      {/* <CardHeader
        title={selectedAccount?.username}
        subheader={selectedAccount?.account.address}
        action={
          <div>
            <IconButton
              aria-label="settings"
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuList>
                <header className="header-menu">
                  <div className="header-bar">
                    Tài khoản của bạn
                    <Button
                      onClick={() => {
                        auth.signout();
                      }}
                      size="small"
                      variant="outlined"
                    >
                      Khóa
                    </Button>
                  </div>
                </header>
                <ListAccount />
                <MenuItem
                  onClick={() => {
                    navigate("/create");
                  }}
                >
                  <ListItemIcon>
                    <AddIcon fontSize="medium" />
                  </ListItemIcon>
                  <Typography variant="inherit">Thêm tài khoản</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/import")}>
                  <ListItemIcon>
                    <KeyboardDoubleArrowDownIcon fontSize="medium" />
                  </ListItemIcon>
                  <Typography variant="inherit">Nhập tài khoản</Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <SettingsIcon fontSize="medium" />
                  </ListItemIcon>
                  <Typography variant="inherit">Cài đặt</Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        }
      /> */}
      <Box sx ={{alignItems: 'center', display: 'flex',  justifyContent: 'space-between'}}>
        <div sx = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '15vh' }}>
          <Button variant="text">
            Text<br/>
            text
          </Button>
        </div>
        <div sx ={{position: 'absolute', right: '0px'}}>
          <IconButton
              aria-label="settings"
              onClick={handleOpenUserMenu}
              sx={{ p: 0, right: '5px' }}
            >
              <MoreVertIcon />
          </IconButton>
          <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuList>
                <header className="header-menu">
                  <div className="header-bar">
                    Tài khoản của bạn
                    <Button
                      onClick={() => {
                        auth.signout();
                      }}
                      size="small"
                      variant="outlined"
                    >
                      Khóa
                    </Button>
                  </div>
                </header>
                <ListAccount />
                <MenuItem
                  onClick={() => {
                    navigate("/create");
                  }}
                >
                  <ListItemIcon>
                    <AddIcon fontSize="medium" />
                  </ListItemIcon>
                  <Typography variant="inherit">Thêm tài khoản</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/import")}>
                  <ListItemIcon>
                    <KeyboardDoubleArrowDownIcon fontSize="medium" />
                  </ListItemIcon>
                  <Typography variant="inherit">Nhập tài khoản</Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <SettingsIcon fontSize="medium" />
                  </ListItemIcon>
                  <Typography variant="inherit">Cài đặt</Typography>
                </MenuItem>
              </MenuList>
            </Menu>
        </div>
      </Box>
    </div>
  );
}

export default AppMenu;
