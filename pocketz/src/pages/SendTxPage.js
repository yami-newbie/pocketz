import SendMainAlt from "../components/SendMainAlt";
import SendMain from "../components/SendMain";
import SendHeader from "../components/SendHeader";
import { Card } from "@mui/material";

function SendTransactionPage() {

    return (
        <div className="centered-container">
            <Card sx={{maxWidth: '360px'}}>
                <div sx = {{height: '100px'}}>
                    <SendHeader/>
                </div>
                <SendMain/>
            </Card>
        </div>
    );
}

export default SendTransactionPage;