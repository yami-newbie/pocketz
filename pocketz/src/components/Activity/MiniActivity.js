import React from "react";
import { Typography } from "@mui/material";
import { useListAccount } from "../../serviceData/listAccount";
import Web3 from "web3";

function MiniActivity({ tx }) {
  const listAcc = useListAccount();
  const acc = listAcc.getSelectedAccount();

  const formatWei = (value) => {
    if (value) return new Web3().utils.fromWei(String(value)).toString();
  };
  const getAddressStr = (address) => {
    return address.substr(0, 5) + "..." + address.substr(address.length - 4, 4);
  };
  const getDate = (value) => {
    return new Date(value * 1000).toLocaleDateString("vi");
  };
  const cutString = (string) => {
    if (string.length >= 8){
      return string.substr(0, 7) + "...";
    }
    else return string;
  }
  return tx.to === acc.account.address ? (
    <div className="mini-activity">
      <div>
        <Typography variant="h6" gutterBottom component="div">
          Nhận
        </Typography>
        <div className="two-item">
          <Typography variant="body2" gutterBottom component="div">
            {getDate(tx.timeStamp)} - Từ {getAddressStr(tx.from)}
          </Typography>
        </div>
      </div>
      <div>
        <Typography variant="subtitle1" gutterBottom component="div">
          {cutString(formatWei(tx.value))}
        </Typography>
      </div>
    </div>
  ) : (
    <div className="mini-activity">
      <div>
        <Typography variant="h6" gutterBottom component="div">
          Gửi
        </Typography>
        <div className="two-item">
          <Typography variant="body2" gutterBottom component="div">
            {getDate(tx.timeStamp)} - Đến {getAddressStr(tx.to)}
          </Typography>
        </div>
      </div>
      <div>
        <Typography variant="subtitle1" gutterBottom component="div">
          {'-'+formatWei(tx.value)}
        </Typography>
      </div>
    </div>
  );
}

export default MiniActivity;
