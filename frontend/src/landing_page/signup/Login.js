import React, { useState } from "react";
import axios from "axios";
import { setSession } from "../../utils/auth";
import { API_URL } from "../../config";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_URL}/login`, formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        setSession(res.data.sessionId, res.data.user);
        window.location.href = "/";
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header / Logo area */}
        <div style={styles.header}>
          {/* Replace with your logo image if you have one */}
          <div style={styles.logo}>
            <span style={styles.logoText}>Dashboard</span>
          </div>
          <p style={styles.tagline}>
            Secure login to your account
          </p>
        </div>

        {/* Login form */}
        <div style={styles.formWrapper}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>
                User ID / Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your user ID or email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {}),
              }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <p style={styles.footerNote}>
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#ffffff",
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: "24px",
  },
  container: {
    width: "100%",
    maxWidth: "420px",
  },
  header: {
    marginBottom: "28px",
  },
  logo: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12px",
  },
  logoText: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#387ed1", // Credarsh brand blue
    letterSpacing: "-0.02em",
  },
  tagline: {
    margin: 0,
    fontSize: "14px",
    color: "#666666",
  },
  formWrapper: {
    background: "#ffffff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#444444",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "4px",
    border: "1px solid #dddddd",
    fontSize: "15px",
    color: "#222222",
    outline: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  },
  error: {
    background: "#fff5f5",
    color: "#c53030",
    padding: "10px 12px",
    borderRadius: "4px",
    fontSize: "13px",
    border: "1px solid #fecaca",
  },
  button: {
    marginTop: "4px",
    padding: "12px 16px",
    borderRadius: "4px",
    border: "none",
    background: "#387ed1", // primary blue
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.15s ease",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  footerNote: {
    margin: "8px 0 0",
    fontSize: "12px",
    color: "#888888",
    lineHeight: 1.5,
  },
};

export default Login;