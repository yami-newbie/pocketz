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
  Typography,
  ListItemIcon,
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
import { srcIconSymbol } from "../serviceData/SrcIcon";
import { getInfoProviderByRPC } from "../serviceData/providers";
import Buy from "./Buy";
import AccountDetails from "./AccountDetails/AccountDetails";

export default function MainLayout() {
  const [value, setValue] = useState("1");
  const [username, setUsername] = useState("");
  const [account, setAccount] = useState();
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [txList, setTxList] = useState([]);
  const listAccount = useListAccount();
  const web3Service = useWeb3Service();
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState();
  const [selectedTx, setSelectedTx] = useState();
  const [buy, setBuy] = useState(false);
  const [openAccDetail, setOpenAccDetail] = useState(false);
  const [accDefault, setAccDefault] = useState(null);

  let navigate = useNavigate();

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
  const handleClickOpen = (tx) => {
    setOpen(true);
    setSelectedTx(tx);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickBuy = () => {
    setBuy(true);
  };
  const handleCloseBuy = () => {
    setBuy(false);
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
           <ListItemIcon>
             {tx.to === account.account.address ? (
               <ArrowDownwardIcon color="primary" />
             ) : (
               <SendIcon color="primary" />
             )}
           </ListItemIcon>
           <MiniActivity tx={tx} />
         </ListItemButton>
       </ListItem>
       <Divider />
     </div>
   ));

  useEffect(() => {
    const newProvider = web3Service.getSelectedProvider();
    setProvider(newProvider);
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
    if (listAccount.getSelectedAccount()) {
      setTxList(listAccount.getTxList());
      setAccount(listAccount.getSelectedAccount());
    }
  }, [listAccount]);

  return (
    <div className="main-layout">
      <div className="centered-item">
        <div style={{ width: "400px" }}>
          <Header />
        </div>
        <Card sx={{ width: "400px", minHeight: "500px" }} variant="outlined">
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

          <CardContent sx={{ paddingTop: 0 }}>
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
                      src={
                        provider?.symbol ? srcIconSymbol(provider.symbol) : null
                      }
                    />
                  </div>
                  <div className="balance-text-info">
                    <Typography variant="h4">{fixBalance(balance)}</Typography>
                    <div>&nbsp;</div>
                    <Typography variant="h4">
                      {provider?.symbol ? provider.symbol : null}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="grid-items">
                <div className="balance-button">
                  <div className="items-button">
                    <Avatar
                      onClick={handleClickBuy}
                      sx={{
                        bgcolor: "#2196f3",
                        "&:hover": {
                          cursor: "pointer",
                        },
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
                        "&:hover": {
                          cursor: "pointer",
                        },
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
                        "&:hover": {
                          cursor: "pointer",
                        },
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
                        <ListItemText
                          primary={
                            fixBalance(balance) +
                            " " +
                            (provider?.symbol ? provider.symbol : null)
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </TabPanel>
                {/* <TabPanel value="2">{txList}</TabPanel> */}
                <TabPanel value="2" sx={{ padding: 0 }}>
                  <List>{
                    txList?.map((tx, index) => {
                      return (
                        <div key={index}>
                          <ListItem disablePadding>
                            <ListItemButton onClick={() => handleClickOpen(tx)}>
                              <ListItemIcon>
                                {tx.to === account.account.address?(<ArrowDownwardIcon color="primary"/>):(<SendIcon color="primary"/>)}
                              </ListItemIcon>
                              <MiniActivity tx={tx} />
                            </ListItemButton>
                          </ListItem>
                          <Divider />
                        </div>
                      )
                    })
                  }</List>
                </TabPanel>
              </TabContext>
            </Box>
          </CardContent>
          <footer></footer>
        </Card>
        <Activity open={open} onClose={handleClose} tx={selectedTx}></Activity>
        <Buy open={buy} onClose={handleCloseBuy} openAcc={openDetail}></Buy>
        {accDefault ? (
          <AccountDetails
            open={openAccDetail}
            onClose={closeDetail}
            Account={accDefault}
          />
        ) : null}
      </div>
    </div>
  );
}
