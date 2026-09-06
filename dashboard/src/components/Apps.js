import React, { useState } from "react";

const initialApps = [
  {
    id: "screener",
    name: "Market Screener",
    category: "Analytics",
    tagline: "Filter and discover high-potential stocks",
    description:
      "Scan thousands of stocks across technical indicators, P/E multiples, and moving average breakouts in real-time.",
    status: "Connected",
    iconBg: "#e8f0fe",
    iconColor: "#1a73e8",
    badge: "Popular",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <line x1="11" y1="8" x2="11" y2="14"></line>
        <line x1="8" y1="11" x2="14" y2="11"></line>
      </svg>
    ),
  },
  {
    id: "strategy-lab",
    name: "Strategy Lab",
    category: "Trading Tools",
    tagline: "No-code algorithmic strategy backtesting",
    description:
      "Create custom trading rules, backtest historical data up to 5 years, and receive automated trade signals.",
    status: "Connected",
    iconBg: "#fef3e6",
    iconColor: "#ea6c00",
    badge: "Featured",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    ),
  },
  {
    id: "sip-baskets",
    name: "SIP & Stock Baskets",
    category: "Investments",
    tagline: "Thematic diversified stock portfolios",
    description:
      "Invest in curated baskets of stocks and ETFs based on economic themes, sectors, or algorithmic risk profiles.",
    status: "Available",
    iconBg: "#e6f4ea",
    iconColor: "#137333",
    badge: "Wealth",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
  },
  {
    id: "tax-reports",
    name: "Tax & P&L Insights",
    category: "Analytics",
    tagline: "Automated capital gains tax reports",
    description:
      "Download audit-ready capital gains statements, calculate advance tax liability, and analyze realized P&L.",
    status: "Connected",
    iconBg: "#f3e8fd",
    iconColor: "#9333ea",
    badge: "Utility",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
  },
  {
    id: "dev-api",
    name: "Developer Trading API",
    category: "Developer",
    tagline: "Ultra-low latency HTTP & WebSocket APIs",
    description:
      "Programmatically place orders, retrieve live market quotes, manage portfolio state, and receive execution webhooks.",
    status: "Available",
    iconBg: "#e0f2fe",
    iconColor: "#0284c7",
    badge: "Dev",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
  },
  {
    id: "news-pulse",
    name: "Market News & Sentiment",
    category: "Analytics",
    tagline: "Curated corporate filings & financial news",
    description:
      "Stay informed with real-time exchange announcements, corporate earnings results, and macro-economic summaries.",
    status: "Available",
    iconBg: "#fef9c3",
    iconColor: "#ca8a04",
    badge: "Live",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
      </svg>
    ),
  },
];

const categories = ["All", "Analytics", "Trading Tools", "Investments", "Developer"];

const Apps = () => {
  const [apps, setApps] = useState(initialApps);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNotification, setActiveNotification] = useState("");

  const handleToggleConnect = (id) => {
    setApps((prevApps) =>
      prevApps.map((app) => {
        if (app.id === id) {
          const nextStatus = app.status === "Connected" ? "Available" : "Connected";
          const msg =
            nextStatus === "Connected"
              ? `${app.name} connected successfully.`
              : `${app.name} disconnected.`;
          setActiveNotification(msg);
          setTimeout(() => setActiveNotification(""), 3000);
          return { ...app, status: nextStatus };
        }
        return app;
      })
    );
  };

  const filteredApps = apps.filter((app) => {
    const matchesCategory =
      selectedCategory === "All" || app.category === selectedCategory;
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const connectedCount = apps.filter((a) => a.status === "Connected").length;

  return (
    <div style={styles.container}>
      {/* Header section */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Apps & Integrations</h2>
          <p style={styles.subtitle}>
            Explore and connect specialized trading, analytics, and investment tools
            to supercharge your platform experience.
          </p>
        </div>

        {/* Quick summary metrics */}
        <div style={styles.statsCard}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{apps.length}</span>
            <span style={styles.statLabel}>Total Apps</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <span style={{ ...styles.statNumber, color: "#137333" }}>
              {connectedCount}
            </span>
            <span style={styles.statLabel}>Connected</span>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {activeNotification && (
        <div style={styles.toast}>
          <span>✓ {activeNotification}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div style={styles.filterBar}>
        <div style={styles.categoryPills}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                ...styles.pill,
                ...(selectedCategory === cat ? styles.pillActive : {}),
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={styles.searchWrapper}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#888"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={styles.searchIcon}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search tools & apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* App Cards Grid */}
      <div style={styles.grid}>
        {filteredApps.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={{ margin: 0, color: "#888", fontSize: "14px" }}>
              No apps match your search criteria.
            </p>
          </div>
        ) : (
          filteredApps.map((app) => {
            const isConnected = app.status === "Connected";
            return (
              <div key={app.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div
                    style={{
                      ...styles.iconBox,
                      backgroundColor: app.iconBg,
                      color: app.iconColor,
                    }}
                  >
                    {app.icon}
                  </div>
                  <div style={styles.cardMeta}>
                    <span style={styles.badge}>{app.badge}</span>
                    <span
                      style={{
                        ...styles.statusBadge,
                        ...(isConnected
                          ? styles.statusConnected
                          : styles.statusAvailable),
                      }}
                    >
                      {isConnected ? "Connected" : "Available"}
                    </span>
                  </div>
                </div>

                <div style={styles.cardBody}>
                  <h3 style={styles.appName}>{app.name}</h3>
                  <p style={styles.appTagline}>{app.tagline}</p>
                  <p style={styles.appDescription}>{app.description}</p>
                </div>

                <div style={styles.cardFooter}>
                  <span style={styles.categoryLabel}>{app.category}</span>
                  <button
                    type="button"
                    onClick={() => handleToggleConnect(app.id)}
                    style={{
                      ...styles.actionBtn,
                      ...(isConnected
                        ? styles.actionBtnConnected
                        : styles.actionBtnAvailable),
                    }}
                  >
                    {isConnected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Developer API Section */}
      <div style={styles.devBanner}>
        <div>
          <h4 style={styles.devBannerTitle}>Build Custom Trading Apps</h4>
          <p style={styles.devBannerText}>
            Connect your custom algorithms, backtesters, or automated order-execution
            bots using our unified REST and WebSocket APIs.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setActiveNotification("Developer API keys and documentation opened.");
            setTimeout(() => setActiveNotification(""), 3000);
          }}
          style={styles.devBannerBtn}
        >
          View API Docs
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "16px 8px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "24px",
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "18px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 500,
    color: "#333333",
    margin: "0 0 6px 0",
  },
  subtitle: {
    fontSize: "0.88rem",
    color: "#777777",
    margin: 0,
    maxWidth: "600px",
    lineHeight: "1.45",
  },
  statsCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fafafa",
    border: "1px solid #eaeaea",
    borderRadius: "6px",
    padding: "8px 18px",
    gap: "16px",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statNumber: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#333333",
  },
  statLabel: {
    fontSize: "0.72rem",
    color: "#888888",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statDivider: {
    width: "1px",
    height: "26px",
    backgroundColor: "#dddddd",
  },
  toast: {
    backgroundColor: "#e6f4ea",
    color: "#137333",
    border: "1px solid #ceead6",
    borderRadius: "6px",
    padding: "10px 16px",
    marginBottom: "16px",
    fontSize: "0.85rem",
    fontWeight: 500,
  },
  filterBar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "22px",
  },
  categoryPills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  pill: {
    border: "1px solid #e2e2e2",
    backgroundColor: "#ffffff",
    color: "#555555",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  pillActive: {
    backgroundColor: "#387ed1",
    border: "1px solid #387ed1",
    color: "#ffffff",
  },
  searchWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    minWidth: "220px",
  },
  searchIcon: {
    position: "absolute",
    left: "10px",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "7px 10px 7px 32px",
    fontSize: "0.82rem",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    outline: "none",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  },
  emptyState: {
    gridColumn: "1 / -1",
    padding: "40px 20px",
    textAlign: "center",
    backgroundColor: "#fafafa",
    borderRadius: "6px",
    border: "1px dashed #dedede",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #ebebeb",
    borderRadius: "6px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
    transition: "box-shadow 0.15s ease, border-color 0.15s ease",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "14px",
  },
  iconBox: {
    width: "44px",
    height: "44px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  badge: {
    fontSize: "0.7rem",
    backgroundColor: "#f5f5f5",
    color: "#666",
    padding: "3px 8px",
    borderRadius: "4px",
    fontWeight: 500,
  },
  statusBadge: {
    fontSize: "0.7rem",
    padding: "3px 8px",
    borderRadius: "4px",
    fontWeight: 500,
  },
  statusConnected: {
    backgroundColor: "#e6f4ea",
    color: "#137333",
  },
  statusAvailable: {
    backgroundColor: "#f1f3f4",
    color: "#5f6368",
  },
  cardBody: {
    marginBottom: "16px",
  },
  appName: {
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "#222222",
    margin: "0 0 4px 0",
  },
  appTagline: {
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "#387ed1",
    margin: "0 0 8px 0",
  },
  appDescription: {
    fontSize: "0.82rem",
    color: "#666666",
    margin: 0,
    lineHeight: "1.45",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid #f6f6f6",
    paddingTop: "12px",
  },
  categoryLabel: {
    fontSize: "0.74rem",
    color: "#999999",
  },
  actionBtn: {
    padding: "6px 14px",
    borderRadius: "4px",
    fontSize: "0.8rem",
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    transition: "all 0.15s ease",
  },
  actionBtnAvailable: {
    backgroundColor: "#387ed1",
    color: "#ffffff",
  },
  actionBtnConnected: {
    backgroundColor: "#fce8e6",
    color: "#c5221f",
  },
  devBanner: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    backgroundColor: "#f8fafd",
    border: "1px solid #d2e3fc",
    borderRadius: "6px",
    padding: "20px 24px",
  },
  devBannerTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#174ea6",
    margin: "0 0 4px 0",
  },
  devBannerText: {
    fontSize: "0.82rem",
    color: "#444444",
    margin: 0,
    maxWidth: "650px",
    lineHeight: "1.45",
  },
  devBannerBtn: {
    backgroundColor: "#174ea6",
    color: "#ffffff",
    padding: "9px 18px",
    borderRadius: "4px",
    border: "none",
    fontSize: "0.82rem",
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};

export default Apps;