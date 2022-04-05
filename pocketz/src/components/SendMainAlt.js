import { Card, IconButton, Select, Typography, MenuItem, TextField, Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useListAccount } from '../serviceData/listAccount'
import ClearIcon from '@mui/icons-material/Clear';

export default function SendMainAlt() {
  const listAcc = useListAccount();
  const acc = listAcc.getSelectedAccount();
  const [money, setMoney] = React.useState('');
  const handleChange = (event) => {
    setMoney(event.target.value);
  };
  return (
    <div className = "centered-container" sx = {{width: '360px'}}>
      <Card sx = {{width: '360px'}}>
        <div sx = {{height: '100px'}} className = "round-border">
          <div className='double-item'>
            <div className='margin-left'>
            <Typography variant="body1" gutterBottom>
              {acc.username}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {acc.account.address}
            </Typography>
            </div>
            <div className = "margin-right">
              <IconButton>
                <ClearIcon/>
              </IconButton>
            </div>
          </div>
        </div>
        <div className = 'margin-left'>
          <Typography variant="body1" gutterBottom>
            Asset:
          </Typography>
          <div>
            <Select 
              value={money}
              onChange={handleChange}
              displayEmpty
              sx = {{width: '120px'}}
              defaultValue = {1}
            >
              <MenuItem value={1}>ETH</MenuItem>
            </Select>
            <Typography variant = "caption" gutterBottom sx = {{padding: '10px'}}>
              Balance: 0
            </Typography>
          </div>
        </div>
        <div>
          <Typography variant = "body1" gutterBottom>
            Amount:
          </Typography>
          <div>
            <TextField variant='outlined'
            defaultValue="0"
            sx = {{padding: '10px', marginLeft: '5px'}}
            >
            </TextField>
          </div>
        </div>
        <div className='double-item-10px-bot'>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained">Continue</Button>
        </div>
      </Card>
    </div>
  )
}
