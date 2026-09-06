import React, { useState } from "react";

function Hero({ searchQuery, onSearchChange }) {
  const [selectedBulletin, setSelectedBulletin] = useState(null);

  const quickTags = [
    "Account opening",
    "Segment activation",
    "Intraday margins",
    "UPI deposit",
    "Tax P&L",
  ];

  const bulletins = [
    {
      id: 1,
      title: "Current Takeovers, Buybacks and Delisting Updates",
      detail:
        "Check eligible shares and tender dates for open offers, buybacks, and delisting tenders currently active on BSE/NSE.",
    },
    {
      id: 2,
      title: "Latest Intraday leverages & peak margin rules - MIS & CO",
      detail:
        "Maximum intraday leverage is capped at 5x for equity cash (MIS) and standard SPAN + Exposure for F&O as per SEBI peak margin rules.",
    },
    {
      id: 3,
      title: "Mandatory 2FA (TOTP / Biometric) Security Policy",
      detail:
        "All client accounts require Time-based One-Time Password (TOTP) or biometric login for enhanced account security across web and mobile.",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "#387ed1",
        color: "#ffffff",
        padding: "36px 0 52px",
      }}
    >
      <div className="container">
        {/* Top Header Bar */}
        <div
          className="d-flex flex-wrap align-items-center justify-content-between pb-3 mb-4"
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.22)" }}
        >
          <div className="d-flex align-items-center gap-3">
            <h3 className="m-0 fw-bold fs-4" style={{ letterSpacing: "-0.01em" }}>
              Support Portal
            </h3>
            <span
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                fontSize: "0.75rem",
                padding: "3px 10px",
                borderRadius: "20px",
                fontWeight: "500",
              }}
            >
              Knowledge Base
            </span>
          </div>

          <div className="d-flex align-items-center gap-3 mt-2 mt-sm-0">
            <span style={{ fontSize: "0.85rem", opacity: 0.9 }}>
              Helpdesk: <strong>080 4718 1888</strong>
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="row g-4 align-items-start">
          {/* Left Column: Search & Quick Queries */}
          <div className="col-12 col-lg-7">
            <h1
              className="fw-bold mb-3"
              style={{ fontSize: "1.45rem", lineHeight: "1.4" }}
            >
              Search for an answer or browse help topics below
            </h1>

            {/* Interactive Search Box */}
            <div style={{ position: "relative", marginTop: "16px" }}>
              <span
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                  display: "flex",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Eg. how do I activate F&O, change bank account, deposit funds..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 44px 14px 48px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "0.95rem",
                  color: "#1e293b",
                  outline: "none",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.12)",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#64748b",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {/* Quick search tags */}
            <div className="d-flex flex-wrap gap-2 mt-3 align-items-center">
              <span style={{ fontSize: "0.78rem", opacity: 0.85 }}>Popular:</span>
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSearchChange(tag)}
                  style={{
                    backgroundColor:
                      searchQuery === tag
                        ? "#ffffff"
                        : "rgba(255, 255, 255, 0.16)",
                    color: searchQuery === tag ? "#387ed1" : "#ffffff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "3px 10px",
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Featured Bulletins */}
          <div className="col-12 col-lg-5">
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
                padding: "20px",
                border: "1px solid rgba(255, 255, 255, 0.18)",
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <h5 className="m-0 fw-semibold fs-5">Featured Bulletins</h5>
              </div>

              <div className="d-flex flex-column gap-3">
                {bulletins.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.14)",
                      paddingBottom: "10px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedBulletin(selectedBulletin === b.id ? null : b.id)
                      }
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ffffff",
                        textAlign: "left",
                        padding: 0,
                        fontSize: "0.88rem",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        cursor: "pointer",
                        fontWeight: "500",
                        display: "block",
                        width: "100%",
                      }}
                    >
                      {b.title}
                    </button>
                    {selectedBulletin === b.id && (
                      <p
                        className="mt-2 mb-0"
                        style={{
                          fontSize: "0.82rem",
                          lineHeight: "1.45",
                          color: "#e2e8f0",
                          backgroundColor: "rgba(0, 0, 0, 0.15)",
                          padding: "8px 12px",
                          borderRadius: "4px",
                        }}
                      >
                        {b.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;