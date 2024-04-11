import {
    ThirdwebProvider,
    ConnectButton,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb"

const client = createThirdwebClient({
    clientId: "43e7eaab7fe66f54376971e735ecd535",
    secretKey: "8r_h7edsBBz6iu3Oown8VwylXQaXMA37ZflVWzxwIQmQGzuaUe7NRdyyy94Xb7I90ftsgGU5aUx_88gXxQgNng"
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