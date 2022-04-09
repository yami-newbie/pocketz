import { Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccDetail from './AccDetail';
import { useListAccount } from '../serviceData/listAccount';
import { useState } from 'react';
import Header from './AppHeader';
import { useNavigate } from 'react-router';

export default function SendConfirm({Account}) {
    const listAcc = useListAccount();
    const acc = listAcc.getSelectedAccount();
    const {popup, setPopup} = useState(false);
    let navigate = useNavigate();

    return (
    <div className = 'centered-item'>
        <div style = {{width: '400px'}}>
            <Header/>
        </div>
        
        <Card sx= {{width: '400px'}}>
            <Button size="small">Back</Button>
            <Divider/>
            <div className = 'double-item'>
                <Typography variant="body2" gutterBottom>
                    {acc.username}
                </Typography>
                <ArrowForwardIcon/>
                <Button variant='text'
                    onClick = {() => setPopup(true)}
                >
                    {Account.username}
                </Button>
            </div>
            <Divider/>
            <div className='send-content'>
                <Typography variant="h6" gutterBottom>
                    0 ETH
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
                    Total: 0
                </Typography>
            </div>
            <Divider/>
            <div className = 'double-item'>
                <Button variant="outlined" onClick={() => {navigate("/");}}>Cancel</Button>
                <Button variant="contained">Confirm</Button>
            </div>
        </Card>
        <AccDetail trigger = {popup}>
            {/* <Typography>
                {acc.username}
            </Typography>
            <Typography>
                {acc.address}
            </Typography> */}
        </AccDetail>
    </div>
  )
}
