import React, { useEffect, useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Button, Card, CardContent, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { warning } from '../../../serviceData/constString';
import { useWallet } from '../../../serviceData/walletAccount';
import CopyToClipboard from 'react-copy-to-clipboard';

function AccountExportPrivateKey({Account}) {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [tooltipText, setText] = useState("Copy to clipboard");
  const [password, setPassword] = useState("");
  const [isConfirm, setConfirm] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(null);
  const wallet = useWallet();

  const showDropdown = (e) => {
    setShow(!show);
    setText("Copy to clipboard");
  };
  const hideDropdown = (e) => {
    setShow(false);
  };
  const onCopied = () => {
    setText("Copied!");
  };
  const onConfirm = () => {
    if(password === wallet.wallet.password){
      setConfirm(true);
    }
    else {
      setIsIncorrect(true);
    }
  }

  return (
    <div className="account-details">
      <div className="items" style={{ width: "100%" }}>
        <div className="grid-items">
          <IconButton
            sx={{
              marginLeft: "15px",
              marginRight: "auto",
            }}
            onClick={() => {
              navigate("/details");
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <Avatar
            src={Account?.avatarSrc}
            sx={{ width: 56, height: 56, m: "auto" }}
          />

          <IconButton
            sx={{
              marginLeft: "auto",
              marginRight: "15px",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="items">
        <Typography variant="h6">{Account?.username}</Typography>
      </div>

      <div className="items-align-center">
        <CopyToClipboard
          onCopy={onCopied}
          text={Account?.account.address}
          onMouseEnter={showDropdown}
          onMouseLeave={hideDropdown}
          style={{ width: "80%" }}
        >
          <div className="tooltip">
            <div className="address-content">
              <div className="address-text">{Account?.account.address}</div>
            </div>
            <span className="tooltiptext">{tooltipText}</span>
          </div>
        </CopyToClipboard>
      </div>
      <Divider className="items" flexItem />
      <div className="items">
        <Typography variant="h6">Xuất khóa riêng tư</Typography>
      </div>

      {!isConfirm ? (
        <Card>
          <CardContent>
            <Typography variant="h7">Nhập mật khẩu ví</Typography>

            <TextField
              sx={{ mt: "10px", textAlign: "left" }}
              fullWidth
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {isIncorrect ? (
              <div className="warning-text">Mật khẩu không đúng</div>
            ) : null}

            <div className="warning-content">
              <div className="warning-text">{warning}</div>
            </div>

            <Stack
              sx={{ mt: "15px", height: "50px" }}
              spacing={2}
              direction="row"
            >
              <Button
                sx={{
                  width: "50%",
                  borderRadius: "100px",
                }}
                variant="outlined"
                onClick={() => {
                  navigate("/");
                }}
              >
                Hủy
              </Button>
              <Button
                sx={{
                  width: "50%",
                  borderRadius: "100px",
                }}
                variant="contained"
                onClick={onConfirm}
              >
                Xác nhận
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h7">
              Đây là khóa riêng tư của bạn (hãy nhấn vào để sao chép)
            </Typography>
            <div className="items-align-center">
              <CopyToClipboard
                onCopy={onCopied}
                text={Account.account.privateKey}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
                style={{ marginTop: "10px", width: "80%" }}
              >
                <div className="tooltip">
                  <div className="address-content">
                    <div className="address-text">
                      {Account.account.privateKey}
                    </div>
                  </div>
                  <span className="tooltiptext">{tooltipText}</span>
                </div>
              </CopyToClipboard>
            </div>

            <div className="warning-content">
              <div className="warning-text">{warning}</div>
            </div>
            <Stack sx={{ mt: "10px" }}>
              <Button
                onClick={() => {
                  navigate("/");
                }}
                variant="contained"
                sx={{ borderRadius: "100px", height: "50px" }}
              >
                Hoàn tất
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AccountExportPrivateKey