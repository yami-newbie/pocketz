import { Button, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import { useWeb3Service } from '../serviceData/accountETH';
import {checkProvider, getInfoProvider} from "../serviceData/providers"
function AddNetworkForm({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [errName, setErrName] = useState(false);
  const [urlRpc, setUrlRpc] = useState("");
  const [checkUrl, setCheckUrl] = useState(true);
  const [errRpc, setErrRpc] = useState(false);
  const [chainId, setChainId] = useState("");
  const [errChainId, setErrChainId] = useState(false);
  const [helperTextChainErr, setHelperTextChainErr] = useState("");
  const [symbol, setSymbol] = useState("");
  const [helperTextSymbol, setHelperTextSymbol] = useState("");
  const [errBlockExplorer, setErrBlockExplorer] = useState(false);
  const [blockExplorerURL, setBlockExplorerURL] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [chainIdRes, setChainIdRes] = useState(-1);
  const web3 = new Web3();
  const web3Service = useWeb3Service();

  const Send = () => {
    getInfoProvider(chainId).then(info => {
      onAdd({
        name: name,
        rpc: urlRpc,
        chainId: chainId,
        symbol: symbol,
        faucets: info[0].faucets ? info[0].faucets[0] : "",
        blockExplorerURL: blockExplorerURL,
      });
      onClose();
    })
  };

  useEffect(() => {
    const value = !errBlockExplorer && !errChainId && name.length > 0 && checkUrl && symbol.length > 0 && chainId.length > 0;
    setDisableButton(!value);
  }, [errBlockExplorer, errChainId, errName, name.length, checkUrl, symbol.length, chainId.length])

  useEffect(() => {
    try {
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
                // setHelperTextChainErr();
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
    } catch (err) {
      console.log("vo day r")
      setErrRpc(true);
    }
  }, [urlRpc, web3]);

  useEffect(() => {
    if(chainId.length > 0){
      getInfoProvider(chainId).then((info) => {
        var res = 0;
        // console.log("info", info)
        try {
          if (info.network) {
            res = (info[0].chain);
          } else {
            res =(info[0].nativeCurrency.symbol);
          }
          if (res !== 0) {
            if (symbol !== res && symbol.length > 0) {
              setHelperTextSymbol(
                `Kết nối với mã chuỗi là ${chainId} sử dụng một ký hiệu khác với bạn (${res}) đang sử dụng. Hãy xác nhận lại trước khi tiếp tục`
              );
            } else {
              setHelperTextSymbol();
            }
          } else {
            setHelperTextSymbol("");
          }
        }
        catch(err) {
          setHelperTextSymbol(
            "Ticker symbol verification data is currently unavailable, make sure that the symbol you have entered is correct. It will impact the conversion rates that you see for this network"
          );
        }
      });
    }
    else {
      setHelperTextSymbol("");
    }
  }, [symbol, chainId, urlRpc, chainIdRes])
  
  useEffect(() => {
    setErrName(name.length < 4);
    if (chainId.length > 0) {
      const str = String(chainId.toLocaleLowerCase());
      if (!isNaN(Number(str))) {
        const num = Number(str);
        const providers = web3Service.providers;
        const res = providers.filter((provider) => provider.chainId === num);

        if (providers && res.length === 0) {
          if (chainIdRes !== -1) {
            if (chainIdRes === num) {
              setHelperTextChainErr();
              setErrChainId(false);
              return;
            } else {
              setErrChainId(true);
              setHelperTextChainErr(
                `Điểm cuối đã trả về một mã chuỗi khác: ${chainIdRes}`
              );
              return;
            }
          }
          if (chainIdRes === "error") {
            setErrChainId(true);
            setHelperTextChainErr(
              `Không thể tìm nạp mã chuỗi. URL RPC của bạn có chính xác không?`
            );
            return;
          }
          if (chainIdRes === -1) {
            setHelperTextChainErr();
            setErrChainId(false);
            return;
          }
        } else {
          const provider = res[0];
          setHelperTextChainErr(
            `Mạng ${provider.name} hiện đang sử dụng mã chuỗi này.`
          );
          setErrChainId(true);
          return;
        }
      } else {
        // check hex num
        const res = !Boolean(str.match(/^0x[0-9a-f]+$/i));
        setErrChainId(res);
        if (res) setHelperTextChainErr("Số thập lục phân không hợp lệ.");
        return;
      }
    } else {
      setErrChainId(false);
      setHelperTextChainErr();
      return;
    }
  },[name, chainId, chainIdRes])

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
            helperText={helperTextSymbol}
            onChange={(e) => setSymbol(e.target.value)}
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
            error={errBlockExplorer}
            onChange={(e) => {
              const url = e.target.value;
              setErrBlockExplorer(!checkProvider(url));
              setBlockExplorerURL(url)}}
            helperText={
              !errBlockExplorer
                ? null
                : "URL phải có tiền tố HTTP/HTTPS phù hợp."
            }
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
          disabled={disableButton}
        >
          Lưu
        </Button>
      </Stack>
    </Stack>
  );
}

export default AddNetworkForm