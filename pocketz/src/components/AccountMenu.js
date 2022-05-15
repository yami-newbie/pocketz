import { ListItemIcon, Menu, MenuItem, MenuList, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import InfoIcon from "@mui/icons-material/Info";
import ExpandIcon from '@mui/icons-material/Expand';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useListAccount } from "../serviceData/listAccount";
import { useNavigate } from "react-router";
import { useWeb3Service } from "../serviceData/accountETH";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { confirmText } from "../serviceData/constString";
import ConfirmPassword from "./ConfirmPassword";

function AccountMenu({ state: anchorElUser, onClose: handleCloseUserMenu }) {
    const listAccount = useListAccount();
    let navigate = useNavigate();
    const web3Service = useWeb3Service();
    const [openConfirmForm, setOpenConfirmForm] = useState(false);
    const [isConfirm, setConfirm] = useState(false);

    useEffect(() => {
      if (isConfirm){
        console.log(listAccount.getSelectedAccount());
        listAccount.removeAccount(listAccount.getSelectedAccount());
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConfirm])

    const handleClickOpenConfirmForm = () => {
      setOpenConfirmForm(true);
    };

    const handleCloseConfirmForm = () => {
      setOpenConfirmForm(false);
    };

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
          <MenuList onClick={handleCloseUserMenu}>
            <MenuItem
              onClick={() => {
                window.open(linkToEtherscan());
              }}
            >
              <ListItemIcon>
                <OpenInNewIcon fontSize="medium" />
              </ListItemIcon>
              <Typography variant="inherit">Xem trên Etherscan</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.open(document.URL);
              }}
            >
              <ListItemIcon>
                <ExpandIcon fontSize="medium" />
              </ListItemIcon>
              <Typography variant="inherit">Mở rộng</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/details");
              }}
            >
              <ListItemIcon>
                <InfoIcon fontSize="medium" />
              </ListItemIcon>
              <Typography variant="inherit">Xem chi tiết tài khoản</Typography>
            </MenuItem>
            <MenuItem onClick={handleClickOpenConfirmForm}>
              <ListItemIcon>
                <DeleteOutlineIcon fontSize="medium" />
              </ListItemIcon>
              <Typography variant="inherit">Xoá tài khoản</Typography>
            </MenuItem>
          </MenuList>
        </Menu>
        <Dialog
          sx={{ width: "400px", m: "auto" }}
          open={openConfirmForm}
          onClose={handleCloseConfirmForm}
        >
          <DialogTitle>Xóa tài khoản?</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ textAlign: "center", mb: "10px" }}>
              {confirmText}
            </DialogContentText>
            <ConfirmPassword
              setConfirm={setConfirm}
              onCancel={handleCloseConfirmForm}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
}

export default AccountMenu;