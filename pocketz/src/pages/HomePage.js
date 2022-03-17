import CreateAccountForm from "../components/CreateAccountForm";
import ImportAccount from "../components/ImportAccount";
import ListAccount from "../components/ListAccount";

function HomePage() {
    return (
        <div>
            <ImportAccount/>
            <CreateAccountForm/>
            <ListAccount/>
        </div>
    )
}

export default HomePage;