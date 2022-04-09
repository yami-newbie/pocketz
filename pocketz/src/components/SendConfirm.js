import { Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccDetail from './AccDetail';
import { useListAccount } from '../serviceData/listAccount';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useWeb3Service } from '../serviceData/accountETH';

export default function SendConfirm({Account, setShow, amount}) {
    const listAcc = useListAccount();
    const web3 = useWeb3Service();
    const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState(21000);
    const [gasPrice, setGasPrice] = useState();
    const acc = listAcc.getSelectedAccount();
    const [popup, setPopup] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        const load = () => {
            console.log(web3.calGasPrice(maxPriorityFeePerGas));
            setGasPrice(web3.getGasPrice());
        }
        load();
    }, [])

    return (
      <div className="centered-item">
        <Card sx={{ width: "400px" }}>
          <Button size="small" onClick={setShow}>
            Back
          </Button>
          <Divider />
          <div className="double-item">
            <Typography variant="body2" gutterBottom>
              {acc.username}
            </Typography>
            <ArrowForwardIcon />
            <Button variant="text" onClick={() => setPopup(true)}>
              {Account.username}
            </Button>
          </div>
          <Divider />
          <div className="send-content">
            <Typography variant="h6" gutterBottom>
              {amount} ETH
            </Typography>
          </div>
          <Divider />
          <div className="send-content">
            <Typography variant="h6" gutterBottom>
              Gas estimate: 
            </Typography>
          </div>
          <Divider />
          <div className="send-content">
            <Typography variant="h6" gutterBottom>
              Total: {amount}
            </Typography>
          </div>
          <Divider />
          <div className="double-item">
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                web3.sendTx({
                  account: acc.account,
                  toAddress: Account.account.address,
                  value: amount,
                  gasLimit: maxPriorityFeePerGas,
                });
              }}
              variant="contained"
            >
              Confirm
            </Button>
          </div>
        </Card>
        <AccDetail trigger={popup}>
          {/* <Typography>
                {acc.username}
            </Typography>
            <Typography>
                {acc.address}
            </Typography> */}
        </AccDetail>
      </div>
    );
}
