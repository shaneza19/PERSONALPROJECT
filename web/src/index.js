import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ErrorContextProvider from './contexts/ErrorContext';
import AuthContextProvider from './contexts/AuthContext';

ReactDOM.render(
  <BrowserRouter>
      <ErrorContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ErrorContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
