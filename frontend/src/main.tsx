import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import StoreProvider from "./context/storeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <StoreProvider>
  <BrowserRouter>
      <Flowbite>
        <App />
      </Flowbite>
    </BrowserRouter>
  </StoreProvider>
  </StrictMode>
);
