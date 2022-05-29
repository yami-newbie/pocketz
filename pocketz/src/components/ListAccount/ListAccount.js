import { List, ListItemButton, ListItemText } from "@mui/material";
import ListAccountItem from "./ListAccountItems";
import { useWallet } from "../../serviceData/walletAccount";
import { useListAccount } from "../../serviceData/listAccount";
import { useEffect, useState } from "react";
import { Search } from "../customs/Search";

function ListAccount({ onClickItems }) {
  const wallet = useWallet();
  const listAcc = useListAccount();
  const [sortName, setSortName] = useState("");
  const [valueSort, setValueSort] = useState(listAcc?.accounts);

  useEffect(() => {
    if (sortName !== "" && listAcc) {
      let list = [];
      listAcc.accounts.map((acc) => {
        if (acc.username.toLowerCase().includes(sortName.toLowerCase()))
          list = [...list, acc];
      });
      setValueSort(list);
    } else {
      setValueSort(listAcc.accounts);
    }
  }, [sortName, listAcc]);

  return (
    <div>
      <Search
        sx={{
          mr: 1,
        }}
        onchange={(e) => {
          setSortName(e.target.value);
        }}
      />
      <List
        className="list-Account"
        sx={{
          mr: 1,
          overflow: "auto",
          maxHeight: 200,
          width: "100%",
        }}
      >
        {/* <ImportAccount/>
        <CreateAccountForm /> */}
        {wallet.wallet.isLogin && typeof listAcc.accounts !== "undefined" ? (
          valueSort.length ? (
            valueSort.map((doc, index) => {
              return (
                <ListItemButton
                  sx={{
                    ml: 1,
                    mr: 1,
                  }}
                  key={index}
                  onClick={() => {
                    listAcc.selectAccount(doc.account.address);
                    onClickItems();
                  }}
                >
                  <ListAccountItem Account={doc} />
                </ListItemButton>
              );
            })
          ) : (
            <ListItemText sx={{ pl: 3 }}>Không có tài khoản nào</ListItemText>
          )
        ) : (
          <p>null</p>
        )}
      </List>
    </div>
  );
}

export default ListAccount;
