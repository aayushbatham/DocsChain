import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
const env = await import.meta.env;

const clientId = env.clientId;
console.log(clientId);

const activeChainId = ChainId.Mumbai;

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThirdwebProvider desiredChainId={activeChainId} clientId={clientId}>
    <App />
  </ThirdwebProvider>,
)
