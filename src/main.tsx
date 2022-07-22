import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./features/app/App";
import { AppProviders } from "./features/app/AppProviders";
import "./styles.css";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
