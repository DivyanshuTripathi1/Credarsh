import React from "react";

function Hero() {
  return (
    <div className="container py-4 py-md-5">
      {/* Hero Header */}
      <div className="text-center py-4 py-md-5">
        <span
          style={{
            display: "inline-block",
            fontSize: "0.78rem",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: "#387ed1",
            backgroundColor: "#ebf4fe",
            padding: "6px 16px",
            borderRadius: "50px",
            marginBottom: "16px",
          }}
        >
          Our Vision & Mission
        </span>
        <h1
          className="fw-bold text-dark px-2 mx-auto"
          style={{
            maxWidth: "850px",
            lineHeight: "1.3",
            fontSize: "calc(1.8rem + 1.2vw)",
            letterSpacing: "-0.02em",
          }}
        >
          Democratizing financial markets through transparent technology and intelligent trading.
        </h1>
        <p
          className="text-muted mt-3 mx-auto px-2"
          style={{
            maxWidth: "680px",
            fontSize: "1.1rem",
            lineHeight: "1.7",
          }}
        >
          We are rebuilding the modern investing experience from the ground up—with
          lightning-fast execution, zero hidden fees, and an intuitive ecosystem
          crafted for every investor.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="row g-3 g-md-4 my-3 text-center">
        <div className="col-6 col-md-3">
          <div
            style={{
              padding: "24px 16px",
              backgroundColor: "#fcfdfe",
              border: "1px solid #e8eff7",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(56, 126, 209, 0.04)",
            }}
          >
            <h2 style={{ color: "#387ed1", fontWeight: "700", margin: 0, fontSize: "2rem" }}>
              ₹0
            </h2>
            <p className="text-muted mb-0 mt-2" style={{ fontSize: "0.85rem", fontWeight: "500" }}>
              Delivery Brokerage
            </p>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            style={{
              padding: "24px 16px",
              backgroundColor: "#fcfdfe",
              border: "1px solid #e8eff7",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(56, 126, 209, 0.04)",
            }}
          >
            <h2 style={{ color: "#387ed1", fontWeight: "700", margin: 0, fontSize: "2rem" }}>
              &lt;50ms
            </h2>
            <p className="text-muted mb-0 mt-2" style={{ fontSize: "0.85rem", fontWeight: "500" }}>
              Order Routing Speed
            </p>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            style={{
              padding: "24px 16px",
              backgroundColor: "#fcfdfe",
              border: "1px solid #e8eff7",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(56, 126, 209, 0.04)",
            }}
          >
            <h2 style={{ color: "#387ed1", fontWeight: "700", margin: 0, fontSize: "2rem" }}>
              99.99%
            </h2>
            <p className="text-muted mb-0 mt-2" style={{ fontSize: "0.85rem", fontWeight: "500" }}>
              System Uptime
            </p>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            style={{
              padding: "24px 16px",
              backgroundColor: "#fcfdfe",
              border: "1px solid #e8eff7",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(56, 126, 209, 0.04)",
            }}
          >
            <h2 style={{ color: "#387ed1", fontWeight: "700", margin: 0, fontSize: "2rem" }}>
              100%
            </h2>
            <p className="text-muted mb-0 mt-2" style={{ fontSize: "0.85rem", fontWeight: "500" }}>
              Transparent Pricing
            </p>
          </div>
        </div>
      </div>

      {/* Story & Philosophy (Two Columns) */}
      <div
        className="row p-3 p-md-5 mt-4 mt-md-5 border-top"
        style={{ lineHeight: "1.85", fontSize: "1.05rem", color: "#555" }}
      >
        <div className="col-12 col-md-6 p-2 p-md-4">
          <h3 className="fw-semibold text-dark mb-3" style={{ fontSize: "1.4rem" }}>
            The Story Behind the Platform
          </h3>
          <p>
            We started with a clear belief: modern capital markets should be accessible,
            transparent, and technology-driven. For decades, retail investors were held back
            by confusing fee structures, bloated software, and sluggish execution.
          </p>
          <p>
            We set out to build a sleek, intuitive trading platform that removes every
            unnecessary barrier. By designing an in-house tech stack with high-concurrency
            architecture, we deliver an institutional-grade trading experience directly
            to your browser and mobile device.
          </p>
          <p>
            From stock analysis and real-time watchlists to automated algorithmic strategies,
            our goal is to make investing effortless, transparent, and enjoyable.
          </p>
        </div>

        <div className="col-12 col-md-6 p-2 p-md-4">
          <h3 className="fw-semibold text-dark mb-3" style={{ fontSize: "1.4rem" }}>
            Engineering & Community First
          </h3>
          <p>
            Technology is at the heart of everything we do. Our engineering team focuses
            relentlessly on ultra-low latency execution, clean design, and continuous
            product innovation without relying on legacy third-party dependencies.
          </p>
          <p>
            We believe that informed traders make better decisions. Beyond market tools,
            we are actively fostering open educational resources, market screeners,
            and developer APIs so you can build and automate your financial future with confidence.
          </p>
          <p>
            We are constantly learning, iterating, and shipping new features every week
            to ensure you have the best tools in the industry.
          </p>
        </div>
      </div>

      {/* Core Principles Grid */}
      <div className="row g-4 mt-2 mb-4">
        <div className="col-12 col-md-4">
          <div
            style={{
              padding: "24px",
              backgroundColor: "#ffffff",
              border: "1px solid #edf2f7",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "8px",
                backgroundColor: "#e8f0fe",
                color: "#1a73e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h5 className="fw-bold text-dark mb-2">Radical Transparency</h5>
            <p className="text-muted mb-0" style={{ fontSize: "0.92rem", lineHeight: "1.6" }}>
              Zero hidden fees, zero conflict of interest. We believe in clear pricing
              and honest execution for every single order.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            style={{
              padding: "24px",
              backgroundColor: "#ffffff",
              border: "1px solid #edf2f7",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "8px",
                backgroundColor: "#fef3e6",
                color: "#ea6c00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h5 className="fw-bold text-dark mb-2">Lightning Performance</h5>
            <p className="text-muted mb-0" style={{ fontSize: "0.92rem", lineHeight: "1.6" }}>
              Engineered with modern microservices to deliver sub-50ms execution
              even through peak market volatility.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            style={{
              padding: "24px",
              backgroundColor: "#ffffff",
              border: "1px solid #edf2f7",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "8px",
                backgroundColor: "#e6f4ea",
                color: "#137333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <h5 className="fw-bold text-dark mb-2">Investor Empowerment</h5>
            <p className="text-muted mb-0" style={{ fontSize: "0.92rem", lineHeight: "1.6" }}>
              Comprehensive market education, open developer APIs, and intuitive analytics
              tailored to help you grow your wealth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;