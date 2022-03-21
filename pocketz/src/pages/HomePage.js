import { useWallet } from "../serviceData/walletAccount";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { useListAccount } from "../serviceData/listAccount";
import { useEffect, useState } from "react";
import { useWeb3Service } from "../serviceData/accountETH";

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
        if(!wallet.wallet.isLogin) {
          return navigate("./login")
        }
        const value = await web3.getWeb3().eth.getGasPrice()
        //console.log(web3.getWeb3().utils.fromWei(value))
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
          <MainLayout Account={account} />
        </div>
      </div>
    );
}

export default HomePage;
