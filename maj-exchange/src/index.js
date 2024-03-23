import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MetaMaskProvider } from '@metamask/sdk-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <MetaMaskProvider
            debug={false}
            sdkOptions={{
                dappMetadata: {
                    name: "MajesticCoin Dapp",
                    url: window.location.href,
                },
                // Other options can be included here if needed
            }}
        >
            <App />
        </MetaMaskProvider>
    </React.StrictMode>
);
