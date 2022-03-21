import ProviderWeb3Service from "../../serviceData/accountETH";
import { ProvideAccountList } from "../../serviceData/listAccount";
import { ProvideAuth } from "../../serviceData/walletAccount";
export function AppProvider({ children }) {
  return (
    <ProvideAuth>
      <ProvideAccountList>
        <ProviderWeb3Service>{children}</ProviderWeb3Service>
      </ProvideAccountList>
    </ProvideAuth>
  );
};