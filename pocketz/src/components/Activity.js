import { Dialog, Divider, Link, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Web3 from "web3";
import { useWeb3Service } from "../serviceData/accountETH";
import CopyToClipboard from "react-copy-to-clipboard";

function Activity(props) {
  const { onClose, open, tx } = props;
  const [transaction, setTransaction] = useState();
  const handleClose = () => {
    onClose();
  };
  const web3Service = useWeb3Service();

  const getLink = (hash) => {
    const provider = web3Service.getSelectedProvider();
    if (provider) {
      return `${provider.blockExplorerURL}/tx/${hash}`;
    }
  };

  const getAddressStr = (address) => {
    if (address)
      return (
        address.substr(0, 5) + "..." + address.substr(address.length - 4, 4)
      );
  };
  let total = parseInt(tx?.value) + parseInt(tx?.gasPrice * tx?.gasUsed);

  const formatWei = (value) => {
    if (value) return new Web3().utils.fromWei(String(value)).toString();
  };
  useEffect(() => {
    if (open) {
      web3Service.web3.current.eth.getTransaction(tx.hash).then((res) => {
        setTransaction(res);
      });
    }
  }, [open]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="activity">
        <div className="head">
          <Typography variant="button" display="block" gutterBottom>
            Send
          </Typography>
          <CloseIcon onClick={handleClose} />
        </div>
        <div className="head">
          <Typography variant="subtitle2" gutterBottom component="div">
            Trạng thái
          </Typography>
          <Link
            underline="none"
            sx={{ cursor: "pointer", fontSize: "12px" }}
            onClick={() => {
              window.open(getLink(tx?.hash));
            }}
          >
            Xem trong trình khám phá khối
          </Link>
        </div>
        <div className="head">
          <Typography variant="subtitle2" gutterBottom component="div">
            Đã xác nhận
          </Typography>
          <CopyToClipboard text={tx?.hash}>
            <Link underline="none" sx={{ cursor: "pointer", fontSize: "12px" }}>
              Sao chép mã giao dịch
            </Link>
          </CopyToClipboard>
        </div>
        <div className="head">
          <Typography variant="subtitle2" gutterBottom component="div">
            Từ
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            Đến
          </Typography>
        </div>
        <div className="head">
          <div style={{ width: "40%" }}>{getAddressStr(tx?.from)}</div>
          <ArrowForwardIcon />
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {getAddressStr(tx?.to)}
          </div>
        </div>
        <div>
          <Typography variant="h6" gutterBottom component="div">
            Giao Dịch
          </Typography>
        </div>
        <div className="head">
          <Typography variant="body2" gutterBottom>
            Số chỉ dùng một lần:
          </Typography>
          <Typography variant="body2" gutterBottom>
            {tx?.nonce}
          </Typography>
        </div>
        <Divider />
        <div className="head">
          <Typography variant="caption" display="block" gutterBottom>
            Số tiền
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {formatWei(tx?.value)}
          </Typography>
        </div>
        <div className="head">
          <Typography variant="caption" display="block" gutterBottom>
            Giới Hạn Gas (Đơn Vị)
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {tx?.gas}
          </Typography>
        </div>
        <div className="head">
          <Typography variant="caption" display="block" gutterBottom>
            Đã Dùng Gas (Đơn Vị)
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {tx?.gasUsed}
          </Typography>
        </div>
        <div className="head">
          <Typography variant="caption" display="block" gutterBottom>
            Phí Cơ Bản (GWEI):
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {formatWei(transaction?.gasPrice - transaction?.maxPriorityFeePerGas)}
          </Typography>
        </div>
        <div className="head">
          <Typography variant="caption" display="block" gutterBottom>
            Phí Ưu Tiên (GWEI):
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {formatWei(transaction?.maxPriorityFeePerGas)}
          </Typography>
        </div>
        <div className="head">
          <Typography variant="caption" display="block" gutterBottom>
            Tổng Phí Gas:
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {formatWei(tx?.gasPrice * tx?.gasUsed)}
          </Typography>
        </div>
        <div className="head">
          <Typography variant="caption" display="block" gutterBottom>
            Phí Tối Đa Mỗi Gas:
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {formatWei(transaction?.maxFeePerGas)}
          </Typography>
        </div>
        <Divider />
        <div className="head">
          <Typography variant="caption" display="block" gutterBottom>
            Tổng:
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {formatWei(total)}
          </Typography>
        </div>
      </div>
    </Dialog>
  );
}

export default Activity;
