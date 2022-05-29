import { useWallet } from "../serviceData/walletAccount";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { useListAccount } from "../serviceData/listAccount";
import { useEffect, useState } from "react";

function HomePage() {
    const navigate = useNavigate();
    const wallet = useWallet();
    const listAccount = useListAccount();
    const [account, setAccount] = useState(null);
    useEffect(() => {
      const load = async () => {
        if(!wallet.wallet.password) {
          return navigate("./register")
        }
      }
      load();
    }, [wallet])

    useEffect(() => {
      if(listAccount && listAccount.getSelectedAccount()){
        listAccount.getTxList();
        setAccount(listAccount.getSelectedAccount());
      }
    }, [listAccount])

    useEffect(() => {
      const changeAcc = () => {
        if(listAccount)
          setAccount(listAccount.getSelectedAccount());
      }
      changeAcc();
    }, [listAccount])

    return (
      <div>
        <MainLayout Account={account} />
      </div>
    );
}

export default HomePage;
