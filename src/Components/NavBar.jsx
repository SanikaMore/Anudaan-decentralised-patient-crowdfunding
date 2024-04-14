import {
    ThirdwebProvider,
    ConnectButton,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb"


const client = createThirdwebClient({
    clientId: process.env.REACT_APP_CLIENT_ID,
    secretKey: process.env.REACT_APP_SECRET_KEY,
});

const wallets = [createWallet("io.metamask")];

export default function Navbar() {
    return (
        // <ThirdwebProvider>
        <>
        
            <ConnectButton
                client={client}
                wallets={wallets}
                theme={"dark"}
                connectModal={{ size: "wide" }}
                />
        </>
        // {/* </ThirdwebProvider> */}
    );
}