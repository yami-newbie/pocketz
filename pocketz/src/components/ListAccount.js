
import useLocalStorage from "../hooks/useLocalStorage";
import { Link, List, ListItem, ListItemButton } from "@mui/material";
import ListAccountItem from "./ListAccountItems";
import { color } from "@mui/system";
import { useAuth } from "../serviceData/walletAccount";
import { useListAccount } from "../serviceData/listAccount";

function ListAccount () {
  const auth = useAuth();
  const listAcc = useListAccount();

    return (
      <List
        className="list-Account"
        sx={{
          bgcolor: "text.secondary",
          mr: 1,
        }}
      >
        {/* <ImportAccount/>
        <CreateAccountForm /> */}
        {auth.wallet.isLogin && listAcc.accounts ? (
          listAcc.accounts.map((doc) => {
            return (
              <ListItemButton
                sx={{
                  color: "white",
                  ml: 1,
                  mr: 1,
                }}
                key={doc.key}
              >
                <ListAccountItem Account={doc}/>
              </ListItemButton>
            );
          })
        ) : (
          <p>null</p>
        )}
      </List>
    );
}

export default ListAccount;