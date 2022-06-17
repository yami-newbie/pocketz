import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useWeb3Service } from "../serviceData/accountETH";
import { getInfoProvider } from "../serviceData/providers";
import { useListAccount } from "../serviceData/listAccount"
function Buy(props) {
  const { open, onClose, openAcc } = props;
  const [main, setMain] = useState(true);
  const [url, setUrl] = useState();

  const web3Service = useWeb3Service();
  const listAcc = useListAccount();

  const handleClose = () => {
    onClose();
  };
  const handleClick = () => {
    openAcc();
    onClose();
  };

  useEffect(() => {
    if (open) {
      const provider = web3Service.getSelectedProvider();
      getInfoProvider(provider.chainId).then((res) => {
        console.log(res)
        if(res && res.length > 0){
          if (res[0].network) {
            const provider = res[0];
            setMain(provider.network !== "testnet");
            console.log(res[0])
            if(provider.faucets[0]){
              const _url = provider.faucets[0];
              const address = listAcc.getSelectedAccount().account.address;
              console.log(address);
              setUrl(_url.replace("${ADDRESS}", address))
            }
          } else {
            setMain(true);
          }
        }
        
      });
    } else {
      setMain(true);
    }
  }, [open]);

  useEffect(() => {
    console.log(url)
  }, [url])

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Lấy ETH</DialogTitle>
      <Divider/>
      <DialogContent>
        {main ? (
          <div className="buy">
            <Divider />
            <Stack className="content" spacing={2}>
              <Typography variant="h5">Mua ETH qua Transak</Typography>
              <Typography variant="body1">
                Transak supports credit and debit cards, Apple Pay, MobiKwik,
                and bank transfers (depending on location) in 100+ countries.
                ETH deposits directly into your Pocketz account.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  window.open("https://global.transak.com/");
                }}
                sx={{ borderRadius: "20px" }}
              >
                Chuyển đến Transak
              </Button>
            </Stack>
            <Divider />
            <Stack className="content" spacing={2}>
              <Typography variant="h5">Mua ETH qua MoonPay</Typography>
              <Typography variant="body1">
                MoonPay supports popular payment methods, including Visa,
                Mastercard, Apple / Google / Samsung Pay, and bank transfers in
                145+ countries. Tokens deposit into your Pocketz account.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  window.open("https://buy.moonpay.com/");
                }}
                sx={{ borderRadius: "20px" }}
              >
                Chuyển đến MoonPay
              </Button>
            </Stack>
            <Divider />
            <Stack className="content" spacing={2}>
              <Typography variant="h5">Mua ETH qua Wyre</Typography>
              <Typography variant="body1">
                Wyre cho phép bạn dùng thẻ ghi nợ để nạp ETH trực tiếp vào tài
                khoản Pocketz của mình.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  window.open("https://pay.sendwyre.com/");
                }}
                sx={{ borderRadius: "20px" }}
              >
                Chuyển đến Wyre
              </Button>
            </Stack>
            <Divider />
            <Stack className="content" spacing={2}>
              <Typography variant="h5">Lấy ETH trực tiếp</Typography>
              <Typography variant="body1">
                If you already have some ETH, the quickest way to get ETH in
                your new wallet by direct deposit.
              </Typography>
              <Button
                variant="outlined"
                onClick={handleClick}
                sx={{ borderRadius: "20px" }}
              >
                Xem tài khoản
              </Button>
            </Stack>
          </div>
        ) : (
          <div className="buy">
            <Stack className="content" spacing={2}>
              <Typography variant="h5">Vòi thử nghiệm</Typography>
              <Typography variant="body1">Nhận Ether từ vòi</Typography>
              <Button onClick={() => {
                if(url){
                  window.open(url);
                }
              }} variant="outlined" sx={{ borderRadius: "20px" }}>
                Nhận ETher
              </Button>
            </Stack>
            <Divider />
            <Stack className="content" spacing={2}>
              <Typography variant="h5">Lấy ETH trực tiếp</Typography>
              <Typography variant="body1">
                If you already have some ETH, the quickest way to get ETH in
                your new wallet by direct deposit.
              </Typography>
              <Button
                variant="outlined"
                onClick={handleClick}
                sx={{ borderRadius: "20px" }}
              >
                Xem tài khoản
              </Button>
            </Stack>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Buy;
