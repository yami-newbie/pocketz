import { Avatar } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useState } from "react";
import { useListAccount } from "../../serviceData/listAccount";


function ListAccountItem({ Account, onClick: handleCloseUserMenu = null }) {
  const [balance, setBalance] = useState(0);
  const listAccount = useListAccount();

  useEffect(() => {
    const init = async () => {
      const balance = listAccount.getBalance(Account.account.address);
      const val = String(balance).substr(0, 8);
      setBalance(val);
    };
    init();
    return () => {
      setBalance(0);
    }
  }, [listAccount.balances.current]);

  return (
    <div className="avatar-icon-button" onClick={handleCloseUserMenu}>
      <div>
        {Account.selected ? <DoneIcon /> : <div style={{ width: 24 }}></div>}
      </div>
      <div>
        <Avatar
          sx={{ width: 24, height: 24, ml: 1 }}
          src={Account.avatarSrc}
          alt={Account.username}
        />
      </div>
      <div className="username">
        <div>{Account.username}</div>
        <div id="sub">{balance} ETH</div>
      </div>
    </div>
  );
}

export default ListAccountItem;