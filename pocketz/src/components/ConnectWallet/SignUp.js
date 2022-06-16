import { useEffect, useState } from "react";
import { Box, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField, Tooltip, Typography } from "@mui/material";
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
  const [tooltipText, setText] = useState("Copy to clipboard");

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

  useEffect(() => {
    if(wallet.wallet?.isLogin){
      return navigate("/")
    }
  }, [wallet])

  const signUp = async () => {
    if (password !== "" && confirmpassword !== "") {
      if(password === confirmpassword) {
        const newWallet = wallet.signup(password);
        setMnemonic(newWallet.mnemonic);
        setOpen(true)
      }
      else {
        setErr("Mật khẩu xác nhận không chính xác")
      }
    }
  };

  return (
    <div className="centered">
      <Card sx={{ maxWidth: 275 }}>
        <CardContent>
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="Password"
            variant="standard"
            type="password"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            label="Confirm password"
            variant="standard"
            error={err ? true : false}
            helperText={err ? err : ""}
            type="password"
          />
          <br />
          <br />
          <Button variant="contained" onClick={signUp}>
            Sign up
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
        <Divider/>
        <DialogContent>
          <Box>
            <Typography>
              Đây là cụm mật khẩu khôi phục bí mật của bạn. Hãy lưu trữ nó ở nơi
              an toàn
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItem: "center",
                width: "250px",
                cursor: "pointer",
                backgroundColor: "rgb(240,240,240)",
                padding: "10px",
                margin: "10px"
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
            <Button variant="outlined">Xác nhận</Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SignUp;