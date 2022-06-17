import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useWallet } from "../../serviceData/walletAccount";
import ConfirmPassword from "../AccountDetails/ConfirmPassword";
import { CopyToClipboard } from "react-copy-to-clipboard";

const stText = "Bấm để sao chép";
const ndText = "Đã sao chép";

function ExportMnemonic(props) {
  const { open, onClose } = props;
  const [confirm, setConfirm] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const [tooltipText, setTooltipText] = useState(stText);
  const wallet = useWallet();

  useEffect(() => {
    if (wallet) {
      const _mnemonic = wallet.getMnemonic();
      setMnemonic(_mnemonic);
    }
  }, [wallet]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle>
        <Typography variant="h5">Xuất cụm mật khẩu bí mật</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack alignItems="center" sx={{ width: "100%" }}>
          <Box sx={{ mb: "20px" }}>
            KHÔNG chia sẻ cụm mật khẩu này với bất kỳ ai! Kẻ xấu có thể dùng các
            từ này để đánh cắp tất cả các tài khoản của bạn.
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {!confirm ? (
              <ConfirmPassword setConfirm={setConfirm} />
            ) : (
              <>
                <CopyToClipboard
                  onMouseEnter={() => {
                    setTooltipText(stText);
                  }}
                  onCopy={() => {
                    setTooltipText(ndText);
                  }}
                  text={mnemonic}
                >
                  <Tooltip
                    title={tooltipText}
                    sx={{
                      width: "80%",
                      backgroundColor: "rgb(240,240,240)",
                      padding: "20px",
                      mb: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <Typography textAlign="center">{mnemonic}</Typography>
                  </Tooltip>
                </CopyToClipboard>

                <Divider />
                <Button
                  sx={{ borderRadius: 10, height: "50px", width: "50%" }}
                  variant="contained"
                >
                  Xác nhận
                </Button>
              </>
            )}
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ExportMnemonic;
