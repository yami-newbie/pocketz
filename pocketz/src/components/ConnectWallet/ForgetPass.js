import { Button, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import Header from "../AppHeader";
import { useNavigate } from 'react-router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
function ForgetPass() {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClickShow = () => {
    setShow(true);
  }
  const handleMonseDown = (e) => {
    e.preventDefault();
  }
  return (
    <div className='centered-item'>
      <div style={{ width: "400px" }}>
        <Header />
      </div>
      <div style={{ width: "70%"}}>
        <Typography onClick={()=>{navigate("/");}}>
          {"< Quay lại"}
        </Typography>
        <Typography variant="h3">
            Reset Wallet
        </Typography>
        <Typography variant="body1">
            Pocketz does not keep a copy of your password. If you're having trouble unlocking your account, you will need to reset your wallet. You can do this by providing the Secret Recovery Phrase you used when you set up your wallet.
        </Typography>
        <Typography variant='body1'>
            This action will delete your current wallet and Secret Recovery Phrase from this device, along with the list of accounts you've curated. After resetting with a Secret Recovery Phrase, you'll see a list of accounts based on the Secret Recovery Phrase you use to reset. This new list will automatically include accounts that have a balance. You'll also be able to re-add any other accounts created previously. Custom accounts that you've imported will need to be re-added, and any custom tokens you've added to an account will need to be re-added as well.
        </Typography>
        <Typography variant='body1'>
            Make sure you're using the correct Secret Recovery Phrase before proceeding. You will not be able to undo this.
        </Typography>
        <Typography variant='h5'>
            Cụm Mật Khẩu Khôi Phục Bí Mật
        </Typography>
        <OutlinedInput
            type={show?'text':'password'}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        onClick={handleClickShow}
                        onMouseDown={handleMonseDown}
                        edge="end"
                    >
                        {show?<VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
        />
        <Typography>
            Mật khẩu mới:
        </Typography>
        <TextField variant="outlined"/>
        <Typography>
            Xác nhận mật khẩu
        </Typography>
        <TextField variant="outlined"/>
        <Button variant="contained">Khôi phục</Button>
      </div>
    </div>
  )
}

export default ForgetPass