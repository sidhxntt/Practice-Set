import React from "react";
import ReactDOM from "react-dom/client";
import Redux from "./Redux.jsx";
import "./index.css";
import configureStore from "./redux/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={configureStore}>
      <Redux/>
    </Provider>
  </React.StrictMode>
);
