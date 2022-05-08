import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./index.css";

import ErrorContextProvider from "./contexts/ErrorContext";
import AuthContextProvider from "./contexts/AuthContext";
import SideBarContextProvider from "./contexts/SideBarContext";

ReactDOM.render(
  <BrowserRouter>
    <ErrorContextProvider>
      <AuthContextProvider>
        <SideBarContextProvider>
          <App />
        </SideBarContextProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
