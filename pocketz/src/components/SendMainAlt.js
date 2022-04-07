import { Card, IconButton, Select, Typography, MenuItem, TextField, Button, Stack, CardContent } from '@mui/material'
import React from 'react'
import { useListAccount } from '../serviceData/listAccount'
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router';

export default function SendMainAlt({Account, onExit}) {
  const listAcc = useListAccount();
  const acc = listAcc.getSelectedAccount();
  let navigate = useNavigate();
  const [money, setMoney] = React.useState('');
  const handleChange = (event) => {
    setMoney(event.target.value);
  };
  const buildAddress = (address) => {
    return String(address).substring(0,10);
  }
  return (
    <div className="centered-container" sx={{ width: "360px" }}>
      <Card sx={{ width: "360px" }}>
        <div>
          <div className="kbietdattengi">
            <div className="margin-left">
              <Typography variant="body1" gutterBottom>
                {acc.username}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                {buildAddress(acc.account.address)}
              </Typography>
            </div>
            <div className="margin-right">
              <IconButton
                onClick={() => {
                  navigate("/");
                }}
              >
                <ClearIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="margin-left">
            <Typography variant="body1" gutterBottom>
              Asset:
            </Typography>
            <div>
              <Select
                value={money}
                onChange={handleChange}
                displayEmpty
                sx={{ width: "120px" }}
                defaultValue={1}
              >
                <MenuItem value={1}>ETH</MenuItem>
              </Select>
              <Typography
                variant="caption"
                gutterBottom
                sx={{ padding: "10px" }}
              >
                Balance: 0
              </Typography>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="margin-left">
            <Typography variant="body1" gutterBottom>
              Amount:
            </Typography>
            <TextField
              variant="outlined"
              defaultValue="0"
              sx={{ width: "95%" }}
            />
          </div>
        </div>

        <div
          style={{
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack sx={{ width: "90%" }} direction="row" spacing={2}>
            <Button
              onClick={onExit}
              sx={{ width: "50%", borderRadius: "100px" }}
              variant="outlined"
            >
              Huỷ
            </Button>
            <Button
              sx={{ width: "50%", borderRadius: "100px" }}
              variant="contained"
            >
              Tiếp tục
            </Button>
          </Stack>
        </div>
      </Card>
    </div>
  );
}
