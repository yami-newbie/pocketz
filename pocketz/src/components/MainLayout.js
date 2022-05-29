import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Tab,
  IconButton,
  Button,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useWeb3Service } from "../serviceData/accountETH";
import Header from "./AppHeader";
import { useListAccount } from "../serviceData/listAccount";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountMenu from "./Menu/AccountMenu";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useNavigate } from "react-router";
import Activity from "./Activity/Activity";
import MiniActivity from "./Activity/MiniActivity";

export default function MainLayout() {
  const [value, setValue] = useState("1");
  const [username, setUsername] = useState("");
  const [account, setAccount] = useState();
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const listAccount = useListAccount();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [txList, setTxList] = useState([]);
  const web3Service = useWeb3Service();
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState();
  const [selectedTx, setSelectedTx] = useState();

  let navigate = useNavigate();

  const handleClickOpen = (tx) => {
    setOpen(true);
    setSelectedTx(tx);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const getAddressStr = (address) => {
    return address.substr(0, 5) + "..." + address.substr(address.length - 4, 4);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fixBalance = (_balance) => {
    return _balance?.toString().substr(0, 6);
  };

  const listActivity = txList?.map((tx, index) => (
    <div key={index}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleClickOpen(tx)}>
          <MiniActivity tx={tx} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </div>
  ));

  useEffect(() => {
    setProvider(web3Service.getSelectedProvider());
  }, [web3Service]);

  useEffect(() => {
    const load = async () => {
      if (account && account.account) {
        const bal = listAccount.getBalance(account.account.address);
        setAddress(account.account.address);
        setUsername(account.username);
        setBalance(bal);
      }
    };
    load();
    return () => {
      setBalance(0);
    };
  }, [listAccount, account]);

  useEffect(() => {
    if (listAccount.getSelectedAccount() !== null) {
      setTxList(listAccount.getTxList());
      setAccount(listAccount.getSelectedAccount());
    }
  }, [listAccount]);

  return (
    <div className="centered-item">
      <div style={{ width: "400px" }}>
        <Header />
      </div>
      <Card sx={{ width: "400px" }}>
        <div className="grid-account-info">
          <div />
          <div className="address-account">
            <CopyToClipboard text={address}>
              <Button variant="text">
                <div>
                  <div>{username}</div>
                  <div>{getAddressStr(address)}</div>
                </div>
              </Button>
            </CopyToClipboard>
          </div>
          <div className="menu-account-icon">
            <IconButton aria-label="settings" onClick={handleOpenUserMenu}>
              <MoreVertIcon />
            </IconButton>
            <AccountMenu state={anchorElUser} onClose={handleCloseUserMenu} />
          </div>
        </div>

        <CardContent>
          <Divider />
          <div className="card-content">
            <div className="grid-items">
              <div className="balance-items">
                <div className="icon-token">
                  <Avatar
                    sx={{
                      width: "32px",
                      height: "32px",
                    }}
                    src="/images/ethereum-eth.png"
                  />
                </div>
                <div className="balance-text-info">
                  <div>{fixBalance(balance)}</div>
                  <div>{provider?.symbol ? provider.symbol : null}</div>
                </div>
              </div>
            </div>

            <div className="grid-items">
              <div className="balance-button">
                <div className="items-button">
                  <Avatar
                    sx={{
                      bgcolor: "#2196f3",
                    }}
                  >
                    <ArrowDownwardIcon />
                  </Avatar>
                  <div className="text-button">Mua</div>
                </div>
                <div className="items-button">
                  <Avatar
                    onClick={() => {
                      navigate("./sendtx");
                    }}
                    sx={{
                      bgcolor: "#2196f3",
                    }}
                  >
                    <SendIcon />
                  </Avatar>
                  <div className="text-button">Gửi</div>
                </div>
                <div className="items-button">
                  <Avatar
                    sx={{
                      bgcolor: "#2196f3",
                    }}
                  >
                    <SwapHorizIcon />
                  </Avatar>
                  <div className="text-button">Hoán đổi</div>
                </div>
              </div>
            </div>
          </div>

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  sx={{
                    fontFamily: "IBM Plex Sans",
                  }}
                  variant="fullWidth"
                  onChange={handleChange}
                  aria-label="full width tabs example"
                >
                  <Tab label="Tài sản" value="1" />
                  <Tab label="Hoạt động" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={fixBalance(balance)} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </TabPanel>
              {/* <TabPanel value="2">{txList}</TabPanel> */}
              <TabPanel value="2">
                <List>{listActivity}</List>
              </TabPanel>
            </TabContext>
          </Box>
        </CardContent>
        <footer></footer>
      </Card>
      <Activity open={open} onClose={handleClose} tx={selectedTx}></Activity>
    </div>
  );
}
