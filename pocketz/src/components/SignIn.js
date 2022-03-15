import { useContext, useState } from "react";
import { UserContext } from "../service/UserContext";
import LogOut from "./LogOut";
function SignIn() {
  const [password, setPassword] = useState("");
  const { wallet, setWallet } = useContext(UserContext);

  const login = async () => {
    try {
      if (wallet.password !== "") {
        console.log("it here");
        if (wallet.password === password) {
          await setWallet({
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
    <div>
      {wallet.isLogin ? (
        <LogOut />
      ) : (
        <form onSubmit={login}>
          <input
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button>Sign In</button>
        </form>
      )}
    </div>
  );
}

export default SignIn;
