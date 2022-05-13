import { Button, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import {checkProvider} from "../serviceData/providers"
function AddNetworkForm({ onClose }) {
  const [name, setName] = useState("");
  const [errName, setErrName] = useState(false);
  const [urlRpc, setUrlRpc] = useState("");
  const [checkUrl, setCheckUrl] = useState(true);
  const [errRpc, setErrRpc] = useState(false);
  const [chainId, setChainId] = useState("");
  const [errChainId, setErrChainId] = useState(false);
  const [helperTextChainErr, setHelperTextChainErr] = useState("");
  const [symbol, setSymbol] = useState("");
  const [urlOpt, setUrlOpt] = useState("");
  const [send, setSend] = useState(false);
  const [chainIdRes, setChainIdRes] = useState(-1);
  const web3 = new Web3();

  const Send = () => {
    setSend(true);
  };

  useEffect(() => {
    const urlCheckRes = checkProvider(urlRpc);
    setCheckUrl(urlCheckRes);
    if (urlCheckRes) {
      try {
        if (urlRpc.length > 0) {
          web3.setProvider(urlRpc);
          web3.eth
            .getChainId()
            .then((res) => {
              setChainIdRes(res);
              setErrRpc(false);
              setHelperTextChainErr();
            })
            .catch((err) => {
              setErrRpc(true);
              setChainIdRes("error");
            });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [urlRpc])
  
  useEffect(() => {
    setErrName(send && name.length < 4);
    if (chainId.length > 0) {
      const str = String(chainId.toLocaleLowerCase());
      if (!isNaN(Number(str))) {
        const num = Number(str);
        if(chainIdRes !== -1){
          if(chainIdRes === num){
            setHelperTextChainErr();
            setErrChainId(false);
          }
          else {
            setErrChainId(true);
            setHelperTextChainErr(`Điểm cuối đã trả về một mã chuỗi khác: ${chainIdRes}`);
          }
        }
        if(chainIdRes === "error") {
          setErrChainId(true)
          setHelperTextChainErr(
            `Không thể tìm nạp mã chuỗi. URL RPC của bạn có chính xác không?`
          );
        }
        if(chainIdRes === -1){
          setHelperTextChainErr();
          setErrChainId(false);
        }

      } else {
        // check hex num
        const res = !Boolean(str.match(/^0x[0-9a-f]+$/i));
        setErrChainId(res);
        if (res) setHelperTextChainErr("Số thập lục phân không hợp lệ.");
      }
    } else {
        setErrChainId(false);
        setHelperTextChainErr()
    }
  },[send, name, chainId])

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography
            sx={{ fontWeight: "bold !important" }}
            variant="h7"
            component="div"
          >
            Tên mạng
          </Typography>
          <TextField
            fullWidth
            required
            error={errName}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            helperText={errName ? "Tên mạng phải lớn hơn 4 ký tự." : null}
            InputProps={{ style: { height: "45px", borderRadius: "1rem" } }}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            sx={{ fontWeight: "bold !important" }}
            variant="h7"
            component="div"
          >
            URL RPC mới
          </Typography>
          <TextField
            fullWidth
            error={!checkUrl}
            helperText={
              checkUrl ? null : "URL phải có tiền tố HTTP/HTTPS phù hợp."
            }
            onChange={(e) => {
              const rpc = e.target.value;
              setUrlRpc(rpc);
            }}
            InputProps={{ style: { height: "45px", borderRadius: "1rem" } }}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            sx={{ fontWeight: "bold !important" }}
            variant="h7"
            component="div"
          >
            Mã chuỗi
          </Typography>
          <TextField
            fullWidth
            error={errChainId}
            helperText={helperTextChainErr}
            onChange={(e) => {
              setChainId(e.target.value);
            }}
            InputProps={{ style: { height: "45px", borderRadius: "1rem" } }}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            sx={{ fontWeight: "bold !important" }}
            variant="h7"
            component="div"
          >
            Ký hiệu tiền tệ
          </Typography>
          <TextField
            fullWidth
            InputProps={{ style: { height: "45px", borderRadius: "1rem" } }}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography component="span">
            <Typography
              sx={{ fontWeight: "bold !important" }}
              variant="h7"
              component="span"
            >
              URL trình khám phá khối
            </Typography>
            (Không bắt buộc)
          </Typography>
          <TextField
            fullWidth
            InputProps={{ style: { height: "45px", borderRadius: "1rem" } }}
          />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ height: "45px" }}>
        <Button
          onClick={onClose}
          sx={{ width: "50%", borderRadius: 10 }}
          variant="outlined"
        >
          Hủy
        </Button>
        <Button
          onClick={Send}
          sx={{ width: "50%", borderRadius: 10 }}
          variant="contained"
        >
          Lưu
        </Button>
      </Stack>
    </Stack>
  );
}

export default AddNetworkForm