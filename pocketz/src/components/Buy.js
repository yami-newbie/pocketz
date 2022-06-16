import { Dialog, DialogContent, Button } from '@mui/material'
import React from 'react'

function Buy(props) {
  const {open, onClose, openAcc} = props;  
  const handleClose = () => {
    onClose();
  }
  const handleClick = () => {
    openAcc();
    onClose();
  }
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogContent>
        <div className="buy">
            <Button variant="outlined">Transak</Button>
            <Button variant="outlined">MoonPay</Button>
            <Button variant="outlined">Wyre</Button>
            <Button variant="outlined" onClick={handleClick}>Xem tài khoản</Button>
        </div>
        
      </DialogContent>
    </Dialog>
  )
    
}

export default Buy