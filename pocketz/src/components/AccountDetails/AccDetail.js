import { Button, Dialog, Avatar } from "@mui/material";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { useListAccount } from "../../serviceData/listAccount";
import { useWeb3Service } from "../../serviceData/accountETH";
import "./index.css";

function AccDetail(props) {
  const { onClose, open, account } = props;
  const [show, setShow] = useState(false);
  const [colorCopyIcon, setColorCopyIcon] = useState("disabled");
  const [tooltipText, setText] = useState("Copy to clipboard");
  const listAccount = useListAccount();
  const web3Service = useWeb3Service();
  const linkToEtherscan = () => {
    return (
      web3Service.getLinkCheckAccountInEtherscan() +
      listAccount.getSelectedAccount().account.address
    );
  };
  const handleClose = () => {
    onClose();
  };
  const getAddressStr = (address) => {
    return address.substr(0, 5) + "..." + address.substr(address.length - 4, 4);
  };
  const onCopied = () => {
    setText("Copied!");
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
  return (
    <Dialog onClose={handleClose} open={open}>
      <div>
        <div>
          <Avatar
            src={account.avatarSrc}
            sx={{ width: 56, height: 56, m: "auto" }}
          />
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
      </div>
    </Dialog>
  );
}

export default AccDetail;
