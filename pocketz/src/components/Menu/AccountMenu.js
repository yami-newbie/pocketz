import {
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import InfoIcon from "@mui/icons-material/Info";
import ExpandIcon from "@mui/icons-material/Expand";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useListAccount } from "../../serviceData/listAccount";
import { useWeb3Service } from "../../serviceData/accountETH";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { confirmText } from "../../serviceData/constString";
import ConfirmPassword from "../AccountDetails/ConfirmPassword";
import AccountDetails from "../AccountDetails/AccountDetails";

function AccountMenu({ state: anchorElUser, onClose: handleCloseUserMenu }) {
  const listAccount = useListAccount();
  const web3Service = useWeb3Service();
  const [accDefault, setAccDefault] = useState(null);
  const [openConfirmForm, setOpenConfirmForm] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const [openAccDetail, setOpenAccDetail] = useState(false);

  useEffect(() => {
    const acc = listAccount.getSelectedAccount();
    if (acc) {
      setAccDefault(acc);
    }
  }, [listAccount]);

  const openDetail = () => {
    if (accDefault) setOpenAccDetail(true);
  };

  const closeDetail = () => {
    setOpenAccDetail(false);
  };

  useEffect(() => {
    if (isConfirm) {
      console.log(listAccount.getSelectedAccount());
      listAccount.removeAccount(listAccount.getSelectedAccount());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirm]);

  const handleClickOpenConfirmForm = () => {
    setOpenConfirmForm(true);
  };

  const handleCloseConfirmForm = () => {
    setOpenConfirmForm(false);
  };

  const linkToEtherscan = () => {
    return (
      web3Service.getLinkCheckAccountInEtherscan() +
      listAccount.getSelectedAccount().account.address
    );
  };

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
          <MenuItem onClick={openDetail}>
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
      {accDefault ? (
        <AccountDetails
          open={openAccDetail}
          onClose={closeDetail}
          Account={accDefault}
        />
      ) : null}
    </div>
  );
}

export default AccountMenu;
