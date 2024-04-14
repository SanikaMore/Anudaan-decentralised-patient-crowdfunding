import {
    ThirdwebProvider,
    ConnectButton,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
    clientId: process.env.REACT_APP_CLIENT_ID,
    secretKey: process.env.REACT_APP_SECRET_KEY,
});

const wallets = [createWallet("io.metamask")];

export default function Navbar() {
    return (
        // <ThirdwebProvider>
        <div 
            style={{
                backgroundColor: "#42c966", // Add black background color
                //padding: "10px", // Add padding for space around the content
                display:"flex"
            }}
        >
            <div style={{ 
                color: "white" ,
                padding:"10px",
                textAlign:"center",
                fontSize:"20px",
                fontWeight:"bold"
                        }}>
                Patient Crowd Funding Platform
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end", // Align to the right
                    alignSelf:"center",
                    padding: "10px",
                }}
            >
                <ConnectButton
                    client={client}
                    wallets={wallets}
                    theme={"dark"}
                    connectModal={{ size: "wide" }}
                />
            </div>
        </div>
        // {/* </ThirdwebProvider> */}
    );
}
