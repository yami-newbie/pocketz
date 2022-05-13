import {
  Button,
  ListItemIcon,
  MenuList,
  MenuItem,
  Typography,
  Menu,
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router";
import ListAccount from "./ListAccount";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useWallet } from "../serviceData/walletAccount";
import { useEffect, useState } from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddNetworkForm from "./AddNetworkForm";

function AppMenu({ state: anchorElUser, onClose: handleCloseUserMenu }) {
  const [openForm, setOpenForm] = useState(false);
  let navigate = useNavigate();
  const auth = useWallet();
  useEffect(() => {
    const load = () => {
      if(!auth.wallet.isLogin){
        navigate("/login");
        console.log("nahnah");
      }
    }
    load();
  }, [auth])

  return (
    <div className="text-account-info">
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
          <ListAccount onClickItems={handleCloseUserMenu} />
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
          <MenuItem
            onClick={() => {
              setOpenForm(true);
            }}
          >
            <ListItemIcon>
              <AccountTreeIcon fontSize="medium" />
            </ListItemIcon>
            <Typography variant="inherit">Thêm mạng</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <SettingsIcon fontSize="medium" />
            </ListItemIcon>
            <Typography variant="inherit">Cài đặt</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
      <Dialog
        open={openForm}
        onClose={() => {
          setOpenForm(false);
        }}
        PaperProps={{ style: { borderRadius: "1rem" } }}
      >
        <DialogTitle>
          <Typography variant="h5" component="div">
            Thêm mạng
          </Typography>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <AddNetworkForm
            onClose={() => {
              setOpenForm(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AppMenu;
