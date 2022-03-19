import ListAccount from "./ListAccount";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { ProvideAccountList } from "../serviceData/listAccount";
import { Button, ListItemIcon, MenuList, MenuItem, Paper, Typography } from "@mui/material";
function AppMenu() {
  return (
    <div className="menu">
      <header className="header-menu">
        <div>
          Tài khoản của bạn
        </div>
        <Button size="small" variant="outlined">
          Khóa
        </Button>
      </header>

      <ProvideAccountList>
        <Paper
          sx={
            {
              //bgcolor: "text.secondary"
            }
          }
        >
          <MenuList>
            {/* <ImportAccount />
          <CreateAccountForm /> */}
            <ListAccount />
            <MenuItem>
              <ListItemIcon>
                <AddIcon fontSize="medium" />
              </ListItemIcon>
              <Typography variant="inherit">Thêm tài khoản</Typography>
            </MenuItem>
            <MenuItem>
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
      </ProvideAccountList>
    </div>
  );
}

export default AppMenu;
