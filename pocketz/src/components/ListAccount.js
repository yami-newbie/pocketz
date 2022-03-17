
import { useContext } from "react";
import { UserContext } from "../service/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { Link, List, ListItem, ListItemButton } from "@mui/material";
import ListAccountItem from "./ListAccountItems";
import { color } from "@mui/system";

function ListAccount () {
  const [account] = useLocalStorage("listAccount", []);
  const { wallet } = useContext(UserContext);

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
        {wallet.isLogin && account ? (
          account.map((doc) => {
            return (
              <ListItemButton
                sx={{
                  color: "white",
                  ml: 1,
                  mr: 1,
                }}
                key={doc.key}
              >
                <ListAccountItem />
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