import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Ion } from "cesium";

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
