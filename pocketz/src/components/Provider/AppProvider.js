import { ProvideAccountList } from "../../serviceData/listAccount";
import { ProvideAuth } from "../../serviceData/walletAccount";
import Web3ProviderApp from "./Web3Provider";
export function AppProvider({ children }) {
  
  return (
    <Web3ProviderApp>
      <ProvideAuth>
        <ProvideAccountList>{children}</ProvideAccountList>
      </ProvideAuth>
    </Web3ProviderApp>
  );
};