export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3002";

export const FRONTEND_URL =
  process.env.REACT_APP_FRONTEND_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
    ? `http://${window.location.hostname}:${
        window.location.port === "3000" ? "3001" : "3000"
      }`
    : typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3001");
