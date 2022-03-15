import useLocalStorage from "../hooks/useLocalStorage";
import React, { useState } from "react";
import accountDataService from '../service/account'

function CreateAccountForm() {
    const [username, setUsername] = useState("");
    const [key, setKey] = useLocalStorage("key", 0);
    const [count, setCount] = useLocalStorage("count", 0);
    const [account, setAccount] = useLocalStorage("listAccount", []);

    const createAccount = async () => {
        const _key = key;
        setKey(_key + 1);
        if(username === "")
            setCount(count + 1);
        try {
            const acc = await accountDataService.create({
              key: key,
              username: username === "" ? "Account " + count : username,
            });
            console.log("account");
            setAccount([...account, acc]);
        } catch (e) {
            console.log(e);
        }
        if(username !== "")
            setUsername("");
    };
    return (
      <div>
        <form onSubmit={createAccount}>
          <input
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <button>Create</button>
        </form>
      </div>
    );
}

export default CreateAccountForm;