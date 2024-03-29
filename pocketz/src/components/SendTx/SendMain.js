import React from "react";
import { TextField, List, ListItemText } from "@mui/material";
import { ListItem, ListItemButton, Divider } from "@mui/material";
import { useListAccount } from "../../serviceData/listAccount";
import { useEffect, useState } from "react";
import { InputAdornment, Card } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SendMainAlt from "./SendMainAlt";
import SendHeader from "./SendHeader";
import Header from "../AppHeader";
import { useWeb3Service } from "../../serviceData/accountETH";

export default function SendMain() {
  const listAcc = useListAccount();
  const [address, setAddress] = useState("");
  const [valueSort, setValueSort] = useState(listAcc.accounts);
  const [show, setShow] = useState(false);
  const [accountSelect, setAccountSelect] = useState();
  const web3Service = useWeb3Service();

  useEffect(() => {
    if (address !== "") {
      let list = [];
      listAcc.accounts.map((acc) => {
        if (acc.username.toLowerCase().includes(address.toLowerCase()))
          list = [...list, acc];
      });
      setValueSort(list);
    } else {
      setValueSort(listAcc.accounts);
    }
  }, [address, listAcc]);
  const onSelectAccount = () => {
    setShow(true);
  };
  const onExit = () => {
    setShow(false);
  };

  return (
    <div className="centered-container">
      {!show ? (
        <div>
          <div style={{ width: "400px" }}>
            <Header />
          </div>
          <Card>
            <SendHeader />
          </Card>

          <div className="search-container">
            <TextField
              id="outlined-search"
              onChange={(e) => {
                const _address = e.target.value;
                if (web3Service.web3.current.utils.isAddress(_address)){
                  setAccountSelect({
                    username: "Chưa có tên",
                    account: { address: _address },
                  });
                  setShow(true)
                }
              }}
              type="search"
              sx={{ width: "95%", marginTop: "10px", bgcolor: "white" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="centered-item-10px-top">
            <Card
              sx={{
                width: "100%",
                maxWidth: "400px",
                bgcolor: "background.paper",
                height: "60vh",
              }}
            >
              <List sx={{ width: "400px" }}>
                {valueSort.map((acc, i) => {
                  return (
                    <div key={i}>
                      <ListItem
                        disablePadding
                        onClick={() => {
                          setAccountSelect(acc);
                          onSelectAccount();
                          //navigate("./mainalt");
                        }}
                      >
                        <ListItemButton>
                          <ListItemText primary={acc.username} />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
              </List>
            </Card>
          </div>
        </div>
      ) : (
        <SendMainAlt Account={accountSelect} address={address} onExit={onExit} />
      )}
    </div>
  );
}
