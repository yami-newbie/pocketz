import useLocalStorage from "../hooks/useLocalStorage";
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ListAccountItem from "./ListAccountItems";
import { alpha, color } from "@mui/system";
import { useAuth } from "../serviceData/walletAccount";
import { useListAccount } from "../serviceData/listAccount";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Search } from "./customs/Search";

function ListAccount() {
  const auth = useAuth();
  const listAcc = useListAccount();
  const [sortName, setSortName] = useState("");
  const [valueSort, setValueSort] = useState(listAcc.accounts);
  
  useEffect(() => {
    if (sortName !== "") {
      let list = [];
      listAcc.accounts.map((acc) => {
        if (acc.username.toLowerCase().includes(sortName.toLowerCase()))
          list = [...list, acc];
      });
      setValueSort(list);
    }
    else{
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
          maxHeight: 100,
          width: '100%'
        }}
      >
        {/* <ImportAccount/>
        <CreateAccountForm /> */}
        {auth.wallet.isLogin && listAcc.accounts ? (
          valueSort.length ? (
            valueSort.map((doc) => {
              return (
                <ListItemButton
                  sx={{
                    ml: 1,
                    mr: 1,
                  }}
                  key={doc.key}
                  onClick={() => listAcc.selectAccount(doc.key)}
                >
                  <ListAccountItem Account={doc} />
                </ListItemButton>
              );
            })
          ) : (
            <ListItemText>No have result</ListItemText>
          )
        ) : (
          <p>null</p>
        )}
      </List>
    </div>
  );
}

export default ListAccount;
