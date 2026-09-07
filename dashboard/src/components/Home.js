import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { API_URL, FRONTEND_URL } from "../config";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        // Read sessionId from query parameters (cross-domain SSO handoff)
        const params = new URLSearchParams(window.location.search);
        const urlSessionId = params.get("sessionId");
        if (urlSessionId) {
          localStorage.setItem("sessionId", urlSessionId);
          sessionStorage.setItem("sessionId", urlSessionId);
          params.delete("sessionId");
          const remaining = params.toString() ? `?${params.toString()}` : "";
          window.history.replaceState({}, document.title, window.location.pathname + remaining);
        }

        const effectiveSessionId =
          urlSessionId ||
          localStorage.getItem("sessionId") ||
          sessionStorage.getItem("sessionId");

        const headers = {
          "Content-Type": "application/json",
        };
        if (effectiveSessionId) {
          headers["x-session-id"] = effectiveSessionId;
          headers["Authorization"] = `Bearer ${effectiveSessionId}`;
        }

        const res = await fetch(`${API_URL}/me`, {
          method: "GET",
          credentials: "include",
          headers,
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.sessionId) {
            localStorage.setItem("sessionId", data.sessionId);
          }
          if (data?.user?.username) {
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.dispatchEvent(new Event("userLoaded"));
          }
          if (isMounted) {
            setIsAuthenticated(true);
            setLoading(false);
          }
        } else {
          // Session is invalid or expired -> redirect to frontend
          localStorage.removeItem("username");
          localStorage.removeItem("user");
          localStorage.removeItem("sessionId");
          window.location.href = `${FRONTEND_URL}/`;
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        window.location.href = `${FRONTEND_URL}/`;
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || !isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Inter, sans-serif",
          color: "#666",
        }}
      >
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;