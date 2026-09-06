import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

// Enable credentials so cookies are automatically sent with all requests
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const sessionId = localStorage.getItem("sessionId") || sessionStorage.getItem("sessionId");
    if (sessionId) {
      config.headers = config.headers || {};
      config.headers["x-session-id"] = sessionId;
      config.headers["Authorization"] = `Bearer ${sessionId}`;
    }
  }
  return config;
});

const USER_KEY = "user";

export const checkUrlLogout = () => {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get("logout") === "true") {
    clearSession();
    params.delete("logout");
    const newQuery = params.toString() ? `?${params.toString()}` : "";
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname + newQuery
    );
    return true;
  }
  return false;
};

/**
 * Get current session ID from storage.
 */
export const getSessionId = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("sessionId") || sessionStorage.getItem("sessionId") || null;
};

/**
 * Get current stored user information.
 */
export const getUser = () => {
  if (typeof window === "undefined") return null;

  const raw =
    localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return null;
};

/**
 * Check if the user is currently logged in based on stored user profile.
 */
export const isLoggedIn = () => {
  return Boolean(getUser());
};

/**
 * Store user data, and notify listeners.
 */
export const setSession = (sessionId, user = null) => {
  if (typeof window === "undefined") return;
  if (sessionId) {
    localStorage.setItem("sessionId", sessionId);
    sessionStorage.setItem("sessionId", sessionId);
  }
  if (user) {
    const serialized = typeof user === "string" ? user : JSON.stringify(user);
    localStorage.setItem(USER_KEY, serialized);
    sessionStorage.setItem(USER_KEY, serialized);
    if (user.username) {
      localStorage.setItem("username", user.username);
      sessionStorage.setItem("username", user.username);
    }
  }
  window.dispatchEvent(new Event("authChange"));
};

/**
 * Clear user data from storage, and notify listeners.
 */
export const clearSession = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem("username");
  localStorage.removeItem("sessionId");
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("sessionId");
  window.dispatchEvent(new Event("authChange"));
};

/**
 * Perform full logout by invalidating session on the backend and clearing local state.
 */
export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  } catch (err) {
    console.error("Backend logout error:", err);
  } finally {
    clearSession();
  }
};

/**
 * React hook that provides reactive auth state across components.
 */
export const useAuth = () => {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const handleAuthUpdate = () => {
      setUser(getUser());
    };

    window.addEventListener("storage", handleAuthUpdate);
    window.addEventListener("authChange", handleAuthUpdate);

    return () => {
      window.removeEventListener("storage", handleAuthUpdate);
      window.removeEventListener("authChange", handleAuthUpdate);
    };
  }, []);

  const logout = async () => {
    await logoutUser();
  };

  return {
    isLoggedIn: Boolean(user),
    user,
    logout,
  };
};
