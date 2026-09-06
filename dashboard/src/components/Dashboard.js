import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";
import { watchlist } from "../data/data";

const Dashboard = () => {
  const [mobileTab, setMobileTab] = useState("content");
  const location = useLocation();

  useEffect(() => {
    // When route changes, automatically switch to content view on mobile
    setMobileTab("content");
  }, [location.pathname, location.key]);

  useEffect(() => {
    const handleSwitch = (e) => {
      if (e.detail) setMobileTab(e.detail);
    };
    window.addEventListener("switchMobileTab", handleSwitch);
    return () => window.removeEventListener("switchMobileTab", handleSwitch);
  }, []);

  const getPageTitle = () => {
    const p = location.pathname;
    if (p.startsWith("/orders")) return "Orders";
    if (p.startsWith("/holdings")) return "Holdings";
    if (p.startsWith("/positions")) return "Positions";
    if (p.startsWith("/funds")) return "Funds";
    if (p.startsWith("/apps")) return "Apps";
    return "Dashboard";
  };

  return (
    <div className={`dashboard-container mobile-${mobileTab}`}>
      {/* Mobile view switch bar (hidden on screens >= 768px via CSS) */}
      <div className="mobile-view-bar">
        <button
          type="button"
          className={`mobile-view-btn ${mobileTab === "watchlist" ? "active" : ""}`}
          onClick={() => setMobileTab("watchlist")}
          aria-label="View Watchlist"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "6px" }}
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          Watchlist ({watchlist?.length || 0})
        </button>
        <button
          type="button"
          className={`mobile-view-btn ${mobileTab === "content" ? "active" : ""}`}
          onClick={() => setMobileTab("content")}
          aria-label={`View ${getPageTitle()}`}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "6px" }}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          {getPageTitle()}
        </button>
      </div>

      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;