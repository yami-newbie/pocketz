import AppMenu from "../components/AppMenu";
import { useAuth } from "../serviceData/walletAccount";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function HomePage() {
    const auth = useAuth();
    return (
      <div>
        {auth.wallet.isLogin ? (
          <div>
            <button onClick={() => auth.signout()}>Sign Out</button>
            <div>
             <AppMenu/>
            </div>
          </div>
        ) : (
          <div>
            <LoginPage />
            <RegisterPage />
          </div>
        )}
      </div>
    );
}

export default HomePage;