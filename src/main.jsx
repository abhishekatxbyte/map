import React from "react";

import App from "./App.jsx";
import "./index.css";

import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./Api/store.js";

// As of React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
