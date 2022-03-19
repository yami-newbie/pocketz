import { ProvideAccountList } from "../serviceData/listAccount";
import { ProvideAuth } from "../serviceData/walletAccount";

export function AppProvider({ children }) {
  return (
    <ProvideAuth>
      <ProvideAccountList>
        {children}
      </ProvideAccountList>
    </ProvideAuth>
  );
};