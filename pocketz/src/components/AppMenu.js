import ListAccount from "./ListAccount";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { ProvideAccountList } from "../serviceData/listAccount";
import { Button, ListItemIcon, MenuList, MenuItem, Paper, Typography } from "@mui/material";
import { useAuth } from "../serviceData/walletAccount";
import { useNavigate } from "react-router";
function AppMenu() {
  const auth = useAuth();
  let navigate = useNavigate();

  const createAccount = () => {

  }
  const importAccount = () => {

  };

  return (
    <div className="menu">
      <header className="header-menu">
        <div>Tài khoản của bạn</div>
        <Button
          onClick={() => {
            auth.signout();
          }}
          size="small"
          variant="outlined"
        >
          Khóa
        </Button>
      </header>
      <Paper>
        <MenuList>
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
      </Paper>
    </div>
  );
}

export default AppMenu;
