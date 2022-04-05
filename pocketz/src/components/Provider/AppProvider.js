import ProviderWeb3Service from "../../serviceData/accountETH";
import { ProvideAccountList } from "../../serviceData/listAccount";
import { ProvideAuth } from "../../serviceData/walletAccount";
export function AppProvider({ children }) {
  
  return (
    <ProviderWeb3Service>
      <ProvideAuth>
        <ProvideAccountList>{children}</ProvideAccountList>
      </ProvideAuth>
    </ProviderWeb3Service>
  );
};