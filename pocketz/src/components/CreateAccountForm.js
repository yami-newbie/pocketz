import useLocalStorage from "../hooks/useLocalStorage";
import React from "react";
import account from "../service/account";

function CreateAccountForm() {
    const [username, setUsername] = useLocalStorage("username", "");
    const [key, setKey] = useLocalStorage("key", 0);
    const [count, setCount] = useLocalStorage("count", 0);
    const [users, setUser] = useLocalStorage("users", []);
    const createAccount = async () => {
        const _key = key;
        setKey(_key + 1);
        if(username === "")
            setCount(count + 1);
        try {
            await account.create({
            key: key,
            state: [users, setUser],
            username: username === "" ? 'Account ' + count : username,
            });
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