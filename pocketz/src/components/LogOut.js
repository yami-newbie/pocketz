import { useContext } from "react";
import { UserContext } from "../service/UserContext";

export default function LogOut() {
    const {wallet, setWallet} = useContext(UserContext);
    const logout = async () => {
        await setWallet({
            password: wallet.password,
            isLogin: false,
        })
    }
    return (
      <div>
        <button onClick={logout}>Log Out</button>
      </div>
    );
}