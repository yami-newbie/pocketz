import { useContext, useState } from "react";
import { UserContext } from "../service/UserContext";
function SignIn() {
  const [password, setPassword] = useState("");
  const { wallet, setWallet } = useContext(UserContext);

  const login = () => {
    try {
      if (wallet.password !== "") {
        console.log("it here");
        if (wallet.password === password) {
          setWallet({
            isLogin: true,
            password: wallet.password,
          });
        }
      } else console.log("It null");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form onSubmit={login}>
      <input
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button>Sign In</button>
    </form>
  );
}

export default SignIn;
