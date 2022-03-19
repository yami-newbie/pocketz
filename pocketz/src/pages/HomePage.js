import AppMenu from "../components/AppMenu";
import { useAuth } from "../serviceData/walletAccount";
import {useNavigate} from 'react-router-dom'

function HomePage() {
  let navigate = useNavigate();
    const auth = useAuth();
    return (
      <div>
        {auth.wallet.isLogin ? (
          <div>
            <AppMenu />
          </div>
        ) : (
          navigate("./login")
        )}
      </div>
    );
}

export default HomePage;