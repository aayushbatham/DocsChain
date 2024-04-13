import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
const activeChainId = ChainId.Mumbai;

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThirdwebProvider
    desiredChainId={activeChainId}
    clientId={import.meta.env.VITE_CLIENT_ID}
  >
    <App />
  </ThirdwebProvider>
);
