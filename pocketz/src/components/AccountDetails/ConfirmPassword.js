import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useWallet } from "../../serviceData/walletAccount";

function ConfirmPassword({ setConfirm, onCancel }) {
  const [password, setPassword] = useState("");
  const [isIncorrect, setIsIncorrect] = useState(null);
  const wallet = useWallet();
  const onConfirm = () => {
    if (password === wallet.wallet.password) {
      setConfirm(true);
      setIsIncorrect(false);
      if(onCancel)
        onCancel();
    } else {
      setIsIncorrect(true);
    }
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h7">Nhập mật khẩu ví</Typography>

        <TextField
          sx={{ mt: "10px", textAlign: "left" }}
          fullWidth
          type="password"
          error={isIncorrect ? true : false}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onConfirm();
            }
          }}
        />
        {isIncorrect ? (
          <div className="warning-text">Mật khẩu không đúng</div>
        ) : null}

        <Stack sx={{ mt: "15px", height: "50px" }} spacing={2} direction="row">
          <Button
            sx={{
              width: "50%",
              borderRadius: "100px",
            }}
            variant="outlined"
            onClick={onCancel}
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
  );
}

export default ConfirmPassword;
