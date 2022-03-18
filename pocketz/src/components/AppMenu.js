import CreateAccountForm from "./CreateAccountForm";
import ImportAccount from "./ImportAccount";
import ListAccount from "./ListAccount";
import { ProvideAccountList } from "../serviceData/listAccount";

function AppMenu() {
  return (
    <div>
      <ProvideAccountList>
        <ImportAccount />
        <CreateAccountForm />
        <ListAccount />
      </ProvideAccountList>
    </div>
  );
}

export default AppMenu;
