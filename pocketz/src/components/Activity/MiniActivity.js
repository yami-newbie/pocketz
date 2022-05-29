import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useListAccount } from "../../serviceData/listAccount";
import Web3 from "web3";

function MiniActivity({ tx }) {
  const listAcc = useListAccount();
  const acc = listAcc.getSelectedAccount();
  // const from = "0x0168E6caf2D7F16325B4cAD20f5b26890C694715",
  // to = "0xA2f567F6cCEEEFb9af083533b727D63C56BB967C",
  // hash = "0xa987c4a4249a62d3ecf14fbdec75b76ce07d1762fe3ff63e0d6ded79f0fb017c",
  // timeStamp = "",
  // value = "0";
  const formatWei = (value) => {
    if (value) return new Web3().utils.fromWei(String(value)).toString();
  };
  const getAddressStr = (address) => {
    return address.substr(0, 5) + "..." + address.substr(address.length - 4, 4);
  };
  const getDate = (value) => {
    return new Date(value * 1000).toLocaleDateString("vi");
  };
  return tx.from === acc.account.address ? (
    <div className="mini-activity">
      <div>
        <Typography variant="h6" gutterBottom component="div">
          Gửi
        </Typography>
        <div className="two-item">
          <Typography variant="body2" gutterBottom component="div">
            Ngày {getDate(tx.timeStamp)} - Đến {getAddressStr(tx.to)}
          </Typography>
        </div>
      </div>
      <div>
        <Typography variant="subtitle1" gutterBottom component="div">
          {formatWei(tx.value)}
        </Typography>
      </div>
    </div>
  ) : (
    <div className="mini-activity">
      <div>
        <Typography variant="h6" gutterBottom component="div">
          Nhận
        </Typography>
        <div className="two-item">
          <Typography variant="body2" gutterBottom component="div">
            Ngày {getDate(tx.timeStamp)} - Đến {getAddressStr(tx.from)}
          </Typography>
        </div>
      </div>
      <div>
        <Typography variant="subtitle1" gutterBottom component="div">
          {formatWei(tx.value)}
        </Typography>
      </div>
    </div>
  );
}

export default MiniActivity;
