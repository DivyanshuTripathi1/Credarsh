import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, getDashboardUrl } from "../utils/auth";
import { DASHBOARD_URL } from "../config";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleLogout = () => {
    setIsNavCollapsed(true);
    logout();
    navigate("/");
  };

  const handleDashboardClick = () => {
    setIsNavCollapsed(true);
    if (isLoggedIn) {
      window.location.href = getDashboardUrl();
    } else {
      navigate("/signup");
    }
  };

  const closeNav = () => {
    setIsNavCollapsed(true);
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom sticky-top py-2"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container px-3">
        <Link className="navbar-brand py-1 my-0 d-flex align-items-center" to="/" onClick={closeNav}>
          <img
            src={process.env.PUBLIC_URL + "/media/images/credarsh.png"}
            style={{ width: "145px", height: "auto", display: "block" }}
            alt="Credarsh Logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavCollapsed ? "" : "show"}`}
          id="navbarSupportedContent"
        >
          <form className="d-flex ms-auto" role="search" onSubmit={(e) => e.preventDefault()}>
            <ul className="navbar-nav mb-lg-0 align-items-lg-center">
              {isLoggedIn ? (
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link active btn btn-link"
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      textDecoration: "none",
                      textAlign: "left",
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/login"
                      onClick={closeNav}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/signup"
                      onClick={closeNav}
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link active" to="/about" onClick={closeNav}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/product" onClick={closeNav}>
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/pricing" onClick={closeNav}>
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/support" onClick={closeNav}>
                  Support
                </Link>
              </li>
              <li className="nav-item mt-2 mt-lg-0 ms-lg-3">
                <button
                  type="button"
                  onClick={handleDashboardClick}
                  className="btn btn-link p-1 d-flex align-items-center"
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  title={isLoggedIn ? "Go to Kite Dashboard" : "Sign up"}
                >
                  <img
                    src="media/images/kite-logo.png"
                    alt="Kite Dashboard"
                    style={{ width: "28px", height: "28px", objectFit: "contain" }}
                  />
                  <span className="d-lg-none ms-2 text-muted" style={{ fontSize: "14px" }}>
                    Kite Dashboard
                  </span>
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;