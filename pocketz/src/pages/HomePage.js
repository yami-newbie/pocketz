import { useWallet } from "../serviceData/walletAccount";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { useListAccount } from "../serviceData/listAccount";
import { useEffect, useState } from "react";
import { useWeb3Service } from "../serviceData/accountETH";
import AccountDetails from "../components/AccountDetails/AccountDetails";

function HomePage() {
    let navigate = useNavigate();
    const wallet = useWallet();
    const listAccount = useListAccount();
    const web3 = useWeb3Service();
    const [account, setAccount] = useState(listAccount.getSelectedAccount());

    useEffect(() => {
      const load = async () => {
        if(!wallet.wallet.password) {
          return navigate("./register")
        }
      }
      load();
    }, [wallet])

    useEffect(() => {
      const changeAcc = () => {
        setAccount(listAccount.getSelectedAccount());
      }
      changeAcc();
    }, [listAccount])

    return (
      <div>
        <div>
          {/* <AccountDetails Account={account} /> */}
          <MainLayout Account={account} />
        </div>
      </div>
    );
}

export default HomePage;
