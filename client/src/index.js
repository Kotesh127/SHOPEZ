import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>

    <AuthProvider>

      <App />

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="colored"
      />

    </AuthProvider>

  </React.StrictMode>
);