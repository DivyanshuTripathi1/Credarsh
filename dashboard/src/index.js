import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./index.css";
import Home from "./components/Home";

axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const sessionId =
      localStorage.getItem("sessionId") ||
      sessionStorage.getItem("sessionId");
    if (sessionId) {
      config.headers = config.headers || {};
      config.headers["x-session-id"] = sessionId;
      config.headers["Authorization"] = `Bearer ${sessionId}`;
    }
  }
  return config;
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
