import { useEffect } from "react";
import ProviderWeb3Service from "../../serviceData/accountETH";
import { ProvideAccountList } from "../../serviceData/listAccount";
import { ProvideAuth } from "../../serviceData/walletAccount";
export function AppProvider({ children }) {
  useEffect(() => {
    return () => {
      console.log("close");
    };
  }, []);
  return (
    <ProviderWeb3Service>
      <ProvideAuth>
        <ProvideAccountList>{children}</ProvideAccountList>
      </ProvideAuth>
    </ProviderWeb3Service>
  );
};