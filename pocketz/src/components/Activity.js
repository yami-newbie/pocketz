import { Dialog, Divider, Link, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useListAccount } from '../serviceData/listAccount';

function Activity(props) {
    const { onClose, open, tx } = props;
    const handleClose = () => {
        onClose();
    };
    const listAcc = useListAccount();
    const acc = listAcc.getSelectedAccount();
    const status = '0',
    blockHash = '',
    blockNumber = '',
    confirmations = "",
    contactAddress = "",
    cumulativeGasUsed = "",
    from = "0x0168E6caf2D7F16325B4cAD20f5b26890C694715",
    gas = "",
    gasPrice = "",
    gasUsed = "",
    hash = "0xa987c4a4249a62d3ecf14fbdec75b76ce07d1762fe3ff63e0d6ded79f0fb017c",
    input = "0x",
    isError = "",
    nonce = "0",
    timeStamp = "",
    to = "0xA2f567F6cCEEEFb9af083533b727D63C56BB967C",
    transactionIndex = "",
    txreceipt_status = "",
    value = ""
    const getAddressStr = (address) => {
      if (address)
        return address.substr(0, 5) + "..." + address.substr(address.length - 4, 4);
    };
    let total = parseInt(tx?.value)+parseInt(tx?.gasPrice*21000);
  return (
    <Dialog onClose={handleClose} open={open}>
      <div className='activity'>
        <div className='head'>
          <Typography variant="button" display="block" gutterBottom>
            Send
          </Typography>
          <CloseIcon onClick={handleClose}/>
        </div>
        <div className = 'head'>
          <Typography variant="subtitle2" gutterBottom component="div">
            Status
          </Typography>
          <Link href="#">Link</Link>
        </div>
        <div className='head'>
          <Typography variant="subtitle2" gutterBottom component="div">
            Success
          </Typography>
          <Link href="#">Link</Link>
        </div>
        <div className='head'>
          <Typography variant="h6" gutterBottom component="div">
            From
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            To
          </Typography>
        </div>
        <div className='head'>
          <div style={{width: '40%'}}>
            {getAddressStr(tx?.from)}
          </div>
          <ArrowForwardIcon/>
          <div style={{width: '40%', display: 'flex', justifyContent: 'flex-end'}}>
            {getAddressStr(tx?.to)}
          </div>
        </div>
        <div>
          <Typography variant="h6" gutterBottom component="div">
            Transaction
          </Typography>
        </div>
        <div className = 'head'>
          <Typography variant="body2" gutterBottom>
            Nonce:
          </Typography>
          <Typography variant="body2" gutterBottom>
            {tx?.nonce}
          </Typography>
        </div>
        <Divider/>
        <div className='head'>
          <Typography variant="caption" display="block" gutterBottom>
            Ammount
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {tx?.value/1000000000000000000}
          </Typography>
        </div>
        <div className='head'>
          <Typography variant="caption" display="block" gutterBottom>
            Gas limit
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {tx?.gas}
          </Typography>
        </div>
        <div className='head'>
          <Typography variant="caption" display="block" gutterBottom>
            Gas used
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {tx?.gasUsed}
          </Typography>
        </div>
        <div className='head'>
          <Typography variant="caption" display="block" gutterBottom>
            Gas fees (base):
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            0
          </Typography>
        </div>
        <div className='head'>
          <Typography variant="caption" display="block" gutterBottom>
            Gas fees (priority):
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            0
          </Typography>
        </div>
        <div className='head'>
          <Typography variant="caption" display="block" gutterBottom>
            Total gas:
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {tx?.gasPrice/1000000000000000000*21000}
          </Typography>
        </div>
        <div className='head'>
          <Typography variant="caption" display="block" gutterBottom>
            gasPrice:
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {tx?.gasPrice/1000000000000000000}
          </Typography>
        </div>
        <Divider/>
        <div className='head'>
          <Typography variant="caption" display="block" gutterBottom>
            Total:
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {total/1000000000000000000}
          </Typography>
        </div>
      </div>
    </Dialog>
  )
}

export default Activity