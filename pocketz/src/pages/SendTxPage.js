import SendMain from "../components/SendMain";
import { Card } from "@mui/material";

function SendTransactionPage() {

    return (
        <div className="centered-container">
            <Card sx={{maxWidth: '360px'}}>
                <SendMain/>
            </Card>
        </div>
    );
}

export default SendTransactionPage;