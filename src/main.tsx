import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Store } from "./context/StoreContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Store>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Store>
  // </React.StrictMode>
);
