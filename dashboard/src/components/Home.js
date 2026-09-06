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
        const res = await fetch(`${API_URL}/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
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