import React, { useEffect, useState } from 'react'
import AccountExportPrivateKey from '../components/AccountDetails/AccountExportPrivateKey/AccountExportPrivateKey'
import { useListAccount } from '../serviceData/listAccount';

function AccountExportPrivateKeyPage() {
   const listAccount = useListAccount();
   return (
     <div>
       <AccountExportPrivateKey Account={listAccount.getSelectedAccount()} />
     </div>
   );
}

export default AccountExportPrivateKeyPage