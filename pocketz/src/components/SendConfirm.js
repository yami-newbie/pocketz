import { Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccDetail from './AccDetail';
import { useListAccount } from '../serviceData/listAccount';
import { useState } from 'react';
import Header from './AppHeader';
import { useNavigate } from 'react-router';

export default function SendConfirm({Account, setShow, amount}) {
    const listAcc = useListAccount();
    const acc = listAcc.getSelectedAccount();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
    setOpen(false);
    };
    let navigate = useNavigate();
    const getAddressStr = (address) => {
        return address.substr(0, 5) + "..." + address.substr(address.length - 4, 4);
      };
    return (
    <div className = 'centered-item'>
        
        <Card sx= {{width: '400px'}}>
            <Button size="small"
                onClick = {setShow}
            >Back</Button>
            <Divider/>
            <div className = 'double-item'>
                <Typography variant="body2" gutterBottom>
                    {acc.username}
                </Typography>
                <ArrowForwardIcon/>
                <Button variant='text'
                    onClick = {handleClickOpen}
                >
                    {Account.username}
                </Button>
            </div>
            <Divider/>
            <div className='send-content'>
                <Typography variant="h6" gutterBottom>
                    {amount} ETH
                </Typography>
            </div>
            <Divider/>
            <div className='send-content'>
                <Typography variant='h6' gutterBottom>
                    Gas estimate: 0
                </Typography>
            </div>
            <Divider/>
            <div className='send-content'>
                <Typography variant='h6' gutterBottom>
                    Total: {amount}
                </Typography>
            </div>
            <Divider/>
            <div className = 'double-item'>
                <Button variant="outlined" onClick={() => {navigate("/");}}>Cancel</Button>
                <Button variant="contained">Confirm</Button>
            </div>
            
        </Card>
        <AccDetail
            open={open}
            onClose={handleClose}
            account={Account}>
        </AccDetail>
    </div>
  )
}
