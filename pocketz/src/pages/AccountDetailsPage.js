import { useEffect, useState } from "react";
import AccountDetails from "../components/AccountDetails/AccountDetails";
import {useListAccount } from '../serviceData/listAccount'

function AccountDetailsPage() {
    const listAccount = useListAccount();
    const [account, setAccount] = useState(null);
    useEffect(() => {
        const loadAccount = () => {
            setAccount(listAccount.getSelectedAccount());
        }
        loadAccount();
    }, [listAccount])
    return (
      <div>
        <AccountDetails Account={account} />
      </div>
    );
}

export default AccountDetailsPage;