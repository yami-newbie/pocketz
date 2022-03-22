import {  Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Divider, Tabs, Tab, IconButton } from "@mui/material";
import { useWeb3Service } from "../serviceData/accountETH";
import Header from './Header';
import { Button, Box } from "@mui/material";
import { useListAccount } from "../serviceData/listAccount";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AccountMenu from './AccountMenu';

export default function MainLayout({Account}) {
  const [value, setValue] = useState(0);
  const [balance, setBalance] = useState(0);
  const web3 = useWeb3Service();
  const listAccount = useListAccount();
  const [anchorElUser, setAnchorElUser] = useState(null);
  let selectedAccount = listAccount.getSelectedAccount();

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
      const bal = Account ? await web3.getBalance(Account.account.address) : 0;
      setBalance(bal);
    };
    load();
  }, [Account]);

  const fixBalance = (_balance) => {
    return _balance.toString().substr(0, 6);
  }

  return (
    <div className="centered">
      <Card sx={{ width: 345 }}>
        <Header />
        <div className="grid-account-info">
          <div/>
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "40vh",
            }}
          >
            <div className="balance-text-info">
              <div>{fixBalance(balance)}</div>
              <div>{"ETH"}</div>
            </div>
            <div>text</div>
          </div>

          <Divider />
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
