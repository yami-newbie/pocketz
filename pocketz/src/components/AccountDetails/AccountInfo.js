import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Stack,
} from "@mui/material";
import QRCode from "react-qr-code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useListAccount } from "../../serviceData/listAccount";
import { useWeb3Service } from "../../serviceData/accountETH";

function AccountInfo({Account, onClose, openExport}) {
    const [colorCopyIcon, setColorCopyIcon] = useState("disabled");
    const [colorEditIcon, setColorEditIcon] = useState("disabled");
    const [tooltipText, setText] = useState("Copy to clipboard");
    const [isEdit, setEdit] = useState(false);
    const [username, setUsername] = useState(null);
    const [account, setAccount] = useState(null);
    const listAccount = useListAccount();
    const web3Service = useWeb3Service();
    const [show, setShow] = useState(false);


    const linkToEtherscan = () => {
      return (
        web3Service.getLinkCheckAccountInEtherscan() +
        listAccount.getSelectedAccount().account.address
      );
    };
    const showDropdown = (e) => {
      setShow(!show);
      setText("Copy to clipboard");
      setColorCopyIcon("primary");
    };
    const hideDropdown = (e) => {
      setShow(false);
      setColorCopyIcon("disabled");
    };
    const onCopied = () => {
      setText("Copied!");
    };

    useEffect(() => {
      const loadData = () => {
        setAccount(Account);
        setUsername(Account?.username);
      };
      loadData();
    }, [Account]);
  return (
      <Card className="account-details">
        <div className="items" style={{ width: "100%" }}>
          <div className="grid-items">
            <div />
            <Avatar
              src={Account?.avatarSrc}
              sx={{ width: 56, height: 56, m: "auto" }}
            />
            <IconButton
              sx={{
                marginLeft: "auto",
                marginRight: "15px",
              }}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className="items">
          {!isEdit ? (
            <div className="grid-items">
              <div />
              <div className="text">{account?.username}</div>
              <IconButton
                onMouseEnter={() => {
                  setColorEditIcon("primary");
                }}
                onMouseLeave={() => {
                  setColorEditIcon("disabled");
                }}
                onClick={() => {
                  setColorEditIcon("disabled");
                  setEdit(true);
                }}
                disabled={username ? false : true}
                sx={{
                  marginLeft: "auto",
                }}
              >
                <EditIcon color={colorEditIcon} />
              </IconButton>
            </div>
          ) : (
            <div className="grid-items">
              <div />
              <input
                className="input-username"
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder={username}
              />
              <IconButton
                sx={{
                  marginLeft: "auto",
                }}
                onClick={() => {
                  listAccount.changeUsername(Account, username);
                  setEdit(false);
                }}
              >
                <DoneIcon />
              </IconButton>
            </div>
          )}
        </div>
        <div className="items">
          {account ? (
            <QRCode
              size={150}
              title={account.account.address}
              value={account.account.address}
            />
          ) : null}
        </div>
        <div className="items">
          <CopyToClipboard
            onCopy={onCopied}
            text={account?.account.address}
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
          >
            <div className="tooltip">
              <div className="address-item">
                <div className="address-content">
                  <div className="address-text">{account?.account.address}</div>
                </div>
                <ContentCopyIcon
                  className="icon"
                  fontSize="small"
                  color={colorCopyIcon}
                />
              </div>
              <span className="tooltiptext">{tooltipText}</span>
            </div>
          </CopyToClipboard>
        </div>
        <Stack spacing={1} sx={{ mb: "20px", mt: '20px', height: '100px' }} >
          <Button
            onClick={() => {
              window.open(linkToEtherscan());
            }}
            sx={{ width: "100%", borderRadius: "32px" }}
            className="button"
            variant="outlined"
          >
            Xem trên Etherscan
          </Button>
          <Button
            onClick={openExport}
            sx={{ mb: "20px", borderRadius: "32px" }}
            className="button"
            variant="outlined"
          >
            Xuất khóa riêng tư
          </Button>
        </Stack>
      </Card>
    );
  };

export default AccountInfo