import { useAuth } from "../serviceData/walletAccount";
import {useNavigate} from 'react-router-dom'
import MainLayout from "../components/MainLayout";
import { useListAccount } from "../serviceData/listAccount";
import { useEffect } from "react";

function HomePage() {
  let navigate = useNavigate();
    const auth = useAuth();
    const listAccount = useListAccount();
    useEffect(() => {
      const init = () => {
        console.log("auth.wallet.password", auth.wallet.password);
        console.log("auth.wallet.isLogin", auth.wallet.isLogin);
        if(!auth.wallet.password) {
          console.log("nah");
          return navigate("./register")
        }
        if(!auth.wallet.isLogin) {
          console.log("nah2");
          return navigate("./login")
        }
      }
      init();
    }, [])
    return (
      <div>
        <div>
          <MainLayout Account={listAccount.getSelectedAccount()} />
        </div>
      </div>
    );
}

export default HomePage;