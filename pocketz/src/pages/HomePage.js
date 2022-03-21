import { useAuth } from "../serviceData/walletAccount";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { useListAccount } from "../serviceData/listAccount";
import { useEffect } from "react";

function HomePage() {
    let navigate = useNavigate();
    const auth = useAuth();
    const listAccount = useListAccount();
    useEffect(() => {
      const load = () => {
        if(!auth.wallet.password) {
          console.log("nah");
          return navigate("./register")
        }
        if(!auth.wallet.isLogin) {
          console.log("nah2");
          return navigate("./login")
        }
      }
      load();
    }, [auth])
    return (
      <div>
        <div>
          <MainLayout Account={listAccount.getSelectedAccount()} />
        </div>
      </div>
    );
}

export default HomePage;
