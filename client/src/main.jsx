import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const clientId = '7b11d6a95c83dc53431667ef5799f0ca';
console.log(clientId);

const activeChainId = ChainId.Mumbai;

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThirdwebProvider desiredChainId={activeChainId} clientId={clientId}>
    <App />
  </ThirdwebProvider>,
)
