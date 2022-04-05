import { ListItemIcon, Menu, MenuItem, MenuList, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import InfoIcon from "@mui/icons-material/Info";
import ExpandIcon from '@mui/icons-material/Expand';
import { useListAccount } from "../serviceData/listAccount";
import { useNavigate } from "react-router";
import { useWeb3Service } from "../serviceData/accountETH";

function AccountMenu({ state: anchorElUser, onClose: handleCloseUserMenu }) {
    const listAccount = useListAccount();
    let navigate = useNavigate();
    const web3Service = useWeb3Service();

    const linkToEtherscan = () => {
       return web3Service.getLinkCheckAccountInEtherscan() +
         listAccount.getSelectedAccount().account.address;
    }

    return (
      <div>
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
            <MenuItem onClick={() => {window.open(linkToEtherscan());}}>
              <ListItemIcon>
                <OpenInNewIcon fontSize="medium" />
              </ListItemIcon>
              <Typography variant="inherit">Xem trên Etherscan</Typography>
            </MenuItem>
            <MenuItem onClick={() => {window.open(document.URL);}}>
              <ListItemIcon>
                <ExpandIcon fontSize="medium" />
              </ListItemIcon>
              <Typography variant="inherit">Mở rộng</Typography>
            </MenuItem>
            <MenuItem onClick={() => {navigate("/details");}}>
              <ListItemIcon>
                <InfoIcon fontSize="medium" />
              </ListItemIcon>
              <Typography variant="inherit">Xem chi tiết tài khoản</Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
}

export default AccountMenu;