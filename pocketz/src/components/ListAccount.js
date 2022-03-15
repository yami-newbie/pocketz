
import { useContext, useEffect } from "react";
import { UserContext } from "../service/UserContext";
import CreateAccountForm from "./CreateAccountForm";
import useLocalStorage from "../hooks/useLocalStorage";

function ListAccount () {
  const [account] = useLocalStorage("listAccount", []);
  const { wallet } = useContext(UserContext);

    return (
      <div>
        <CreateAccountForm />
        {wallet.isLogin && account ? (
          <ul>
            {account.map((doc) => {
              return (
                <li key={doc.key}>
                  Username: {doc.username} <br />
                  Address: {doc.account.address} <br />
                  PrivateKey: {doc.account.privateKey}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>null</p>
        )}
      </div>
    );
}

export default ListAccount;