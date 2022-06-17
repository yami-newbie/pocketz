import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";
import { useWallet } from "../../serviceData/walletAccount";
import { useNavigate } from "react-router";
import CopyToClipboard from "react-copy-to-clipboard";

function SignUp() {
  let navigate = useNavigate();
  const wallet = useWallet();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState();
  const [open, setOpen] = useState(false);
  const [mnemonic, setMnemonic] = useState();
  const [show, setShow] = useState(false);
  const [tooltipText, setText] = useState("Nhấn để sao chép");

  const showDropdown = (e) => {
    setShow(!show);
    setText("Nhấn để sao chép");
  };
  const hideDropdown = (e) => {
    setShow(false);
  };
  const onCopied = () => {
    setText("Đã sao chép!");
  };

  useEffect(() => {
    if (wallet.wallet?.isLogin) {
      return navigate("/");
    }
  }, [wallet]);

  const signUp = async () => {
    if (password !== "" && confirmpassword !== "") {
      if (password === confirmpassword) {
        const newWallet = wallet.signup(password);
        setMnemonic(newWallet.mnemonic);
        setOpen(true);
      } else {
        setErr("Mật khẩu xác nhận không chính xác");
      }
    }
  };

  return (
    <div style={{
      display:'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}>
      <Card sx={{ width: '550px' }}>
        <CardContent>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography variant="h4" sx={{mt:'20px'}}>
              Chào mừng đến với Pocketz
            </Typography>
            <Typography variant="h5" sx={{mt:'50px'}}>
              Mời bạn tạo mật khẩu
            </Typography>
          </div>
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth
            label="Mật khẩu"
            variant="standard"
            type="password"
            sx={{marginTop:'20px'}}
          />
          <TextField
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            fullWidth
            label="Xác nhận mật khẩu"
            variant="standard"
            error={err ? true : false}
            helperText={err ? err : ""}
            type="password"
            sx={{marginTop:'20px'}}
          />
          <Button variant="contained" onClick={signUp} sx={{marginTop:'20px'}}>
            Mở ví
          </Button>
          
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h4" textAlign="center">
            Cụm từ khôi phục bí mật
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box>
            <Typography>
              Đây là cụm mật khẩu khôi phục bí mật của bạn. Hãy lưu trữ nó ở nơi
              an toàn:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItem: "center",
                cursor: "pointer",
                backgroundColor: "rgb(240,240,240)",
                padding: "10px",
                margin: "10px",
              }}
            >
              <CopyToClipboard
                onCopy={onCopied}
                text={mnemonic}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <Tooltip title={tooltipText}>
                  <div style={{ textAlign: "center" }}>{mnemonic}</div>
                </Tooltip>
              </CopyToClipboard>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Stack>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
                wallet.signin(password);
              }}
            >
              Xác nhận
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SignUp;
