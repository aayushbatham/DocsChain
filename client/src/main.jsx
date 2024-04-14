import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const clientId = '7b11d6a95c83dc53431667ef5799f0ca';
console.log(clientId);

const activeChainId = ChainId.Mumbai;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThirdwebProvider desiredChainId={activeChainId} clientId={clientId}>
        <RouterProvider router={App} />
      </ThirdwebProvider>,
  </React.StrictMode>
)
