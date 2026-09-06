import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_URL, FRONTEND_URL } from "../config";

const Menu = () => {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(() => {
    const path = window.location.pathname;
    if (path.startsWith("/orders")) return 1;
    if (path.startsWith("/holdings")) return 2;
    if (path.startsWith("/positions")) return 3;
    if (path.startsWith("/funds")) return 4;
    if (path.startsWith("/apps")) return 6;
    return 0;
  });

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [username, setUsername] = useState(() => {
    return (
      localStorage.getItem("username") ||
      sessionStorage.getItem("username") ||
      ""
    );
  });

  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path === "") {
      setSelectedMenu(0);
    } else if (path.startsWith("/orders")) {
      setSelectedMenu(1);
    } else if (path.startsWith("/holdings")) {
      setSelectedMenu(2);
    } else if (path.startsWith("/positions")) {
      setSelectedMenu(3);
    } else if (path.startsWith("/funds")) {
      setSelectedMenu(4);
    } else if (path.startsWith("/apps")) {
      setSelectedMenu(6);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchUser = () => {
      const stored =
        localStorage.getItem("username") || sessionStorage.getItem("username");
      if (stored) {
        setUsername(stored);
        return;
      }

      // Check current user from /me
      fetch(`${API_URL}/me`, { credentials: "include" })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Unauthorized");
        })
        .then((data) => {
          if (data?.user?.username) {
            setUsername(data.user.username);
            localStorage.setItem("username", data.user.username);
          }
        })
        .catch(() => {});
    };

    fetchUser();
    window.addEventListener("userLoaded", fetchUser);
    window.addEventListener("storage", fetchUser);
    return () => {
      window.removeEventListener("userLoaded", fetchUser);
      window.removeEventListener("storage", fetchUser);
    };
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    window.dispatchEvent(
      new CustomEvent("switchMobileTab", { detail: "content" })
    );
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    }
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = `${FRONTEND_URL}/?logout=true`;
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const displayUsername = username || "USERID";
  const avatarInitial = username ? username.charAt(0).toUpperCase() : "ZU";

  return (
    <div className="menu-container">
      <Link to="/" onClick={() => handleMenuClick(0)} className="menu-logo-link">
        <img
          src="logo.png"
          className="menu-logo-img"
          style={{ height: "30px", width: "auto", display: "block" }}
          alt="Credarsh Logo"
        />
      </Link>

      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
      </div>

      <hr className="menu-divider" />

      {/* Profile & Quick Logout: Fixed on the right, ALWAYS visible on both mobile and desktop */}
      <div className="profile-section" ref={profileRef}>
        <div
          className="profile"
          onClick={handleProfileClick}
          title={displayUsername}
        >
          <div className="avatar">{avatarInitial}</div>
          <p className="username">{displayUsername}</p>
        </div>

        {/* Dedicated prominent Logout button */}
        <button
          type="button"
          onClick={handleLogout}
          className="btn-quick-logout"
          title="Logout"
          aria-label="Logout"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "4px" }}
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span className="logout-label">Logout</span>
        </button>

        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <div className="profile-dropdown-header">
              <span className="profile-dropdown-user">{displayUsername}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="profile-dropdown-item logout"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "6px" }}
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
