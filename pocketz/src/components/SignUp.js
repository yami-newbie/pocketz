import { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { UserContext } from "../service/UserContext";

function SignUp() {
  const [wallet, setWallet] = useLocalStorage("wallet", {});

  const [password, setPassword] = useState("");

  const signUp = async () => {
    if (password !== "") {
      await setWallet({
        password: password,
        isLogin: true,
      });
    }
  };
  return (
    <form onSubmit={signUp}>
      <input
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button>Sign Up</button>
    </form>
  );
}

export default SignUp;
