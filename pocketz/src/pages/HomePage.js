import { useAuth } from "../serviceData/walletAccount";
import {useNavigate} from 'react-router-dom'
import MainLayout from "../components/MainLayout";
import { useListAccount } from "../serviceData/listAccount";

function HomePage() {
  let navigate = useNavigate();
    const auth = useAuth();
    const listAccount = useListAccount();
    return (
      <div>
        {auth.wallet.isLogin ? (
          <div>
            <MainLayout Account={listAccount.getSelectedAccount()} />
          </div>
        ) : (
          navigate("./login")
        )}
      </div>
    );
}

export default HomePage;