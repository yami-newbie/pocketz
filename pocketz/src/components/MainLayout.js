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
  ListItemText
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useWeb3Service } from "../serviceData/accountETH";
import Header from "./AppHeader";
import { useListAccount } from "../serviceData/listAccount";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountMenu from "./AccountMenu";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useNavigate } from "react-router";
import { useWallet } from "../serviceData/walletAccount";

export default function MainLayout({ Account }) {
  const [value, setValue] = useState("1");
  const [balance, setBalance] = useState(0);
  const listAccount = useListAccount();
  const [anchorElUser, setAnchorElUser] = useState(null);
  let selectedAccount = listAccount.getSelectedAccount();
  let navigate = useNavigate();
  const wallet = useWallet();
  const [txList, setTxList] = useState();

  useEffect(() => {
    if(wallet.wallet === {}){
      navigate("/register");
    }
  },[]);

  useEffect(() => {
    const loadTxList = async () => {
      setTxList(JSON.stringify(listAccount.getTxList()));
    };
    loadTxList();
  }, [listAccount.txList.current])

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

  useEffect(() => {
    const load = async () => {
      const bal = listAccount.getBalance(Account.account.address);
      setBalance(bal);
    };
    load();
    return () => {
      setBalance(0);
    }
  }, [listAccount.balances.current]);

  const fixBalance = (_balance) => {
    return _balance?.toString().substr(0, 6);
  };

  return (
    <div className="centered-item">
      <div style = {{width: '400px'}}>
        <Header/>
      </div>

      <Card sx={{ width: '400px' }}>
        <div className="grid-account-info">
          <div />
          <div className="address-account">
            <CopyToClipboard text={selectedAccount?.account.address}>
              <Button variant="text">
                <div>
                  <div>{selectedAccount?.username}</div>
                  <div>{getAddressStr(selectedAccount?.account.address)}</div>
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
                  <div>{"ETH"}</div>
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
                        <ListItemText primary= "0 ETH" />
                      </ListItemButton>
                    </ListItem>
                </List>
              </TabPanel>
              <TabPanel value="2">{txList}</TabPanel>
            </TabContext>
          </Box>
        </CardContent>
        <footer></footer>
      </Card>
    </div>
  );
}
