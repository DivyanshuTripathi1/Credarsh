import React from "react";

function Team() {
  return (
    <div className="container py-4 py-md-5">
      {/* Section Header */}
      <div className="text-center mb-4 mb-md-5 border-top pt-5">
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
            marginBottom: "12px",
          }}
        >
          Leadership
        </span>
        <h2 className="fw-bold text-dark fs-2">Meet the Founder</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "540px", fontSize: "0.95rem" }}>
          The visionary mind and engineering force behind the platform.
        </p>
      </div>

      {/* Founder Profile & Bio */}
      <div
        className="row p-3 p-md-4 align-items-center justify-content-center"
        style={{ lineHeight: "1.8", fontSize: "1.05rem" }}
      >
        {/* Photo & Titles */}
        <div className="col-12 col-md-5 text-center mb-4 mb-md-0">
          <div
            style={{
              display: "inline-block",
              padding: "6px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #387ed1, #6ea8fe)",
              boxShadow: "0 8px 24px rgba(56, 126, 209, 0.18)",
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "/media/images/divyanshu.jpg"}
              alt="Divyanshu Tripathi"
              className="img-fluid"
              style={{
                borderRadius: "50%",
                width: "210px",
                height: "210px",
                maxWidth: "100%",
                objectFit: "cover",
                display: "block",
                backgroundColor: "#f4f6f8",
              }}
              onError={(e) => {
                if (!e.currentTarget.dataset.retried) {
                  e.currentTarget.dataset.retried = "1";
                  e.currentTarget.src = "/divyanshu.jpg";
                }
              }}
            />
          </div>

          <h3 className="mt-4 fw-bold text-dark mb-1" style={{ fontSize: "1.4rem" }}>
            Divyanshu Tripathi
          </h3>
          <p className="text-primary fw-medium mb-3" style={{ fontSize: "0.95rem" }}>
            Founder, CEO &amp; Chief Architect
          </p>

          {/* Social Connect Icons */}
          <div className="d-flex justify-content-center gap-3 mt-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                backgroundColor: "#f1f5f9",
                color: "#334155",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                backgroundColor: "#f1f5f9",
                color: "#0a66c2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                backgroundColor: "#f1f5f9",
                color: "#1da1f2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Biography & Mission */}
        <div className="col-12 col-md-7 p-3 p-md-4">
          <p className="text-dark fw-medium" style={{ fontSize: "1.1rem" }}>
            Divyanshu founded this platform to solve the exact friction points he experienced
            firsthand in retail trading: clunky user interfaces, unpredictable downtime,
            and convoluted brokerage structures.
          </p>
          <p className="text-muted">
            Combining a deep passion for financial engineering and modern software development,
            Divyanshu architected the platform with a relentless focus on speed, elegant design,
            and uncompromising security.
          </p>
          <p className="text-muted">
            His core philosophy is simple: empower everyday retail investors with the exact same
            superpowers, ultra-low latency execution, and analytical tools traditionally reserved
            for institutional trading desks.
          </p>

          {/* Quote Card */}
          <div
            className="p-3 p-md-4 mt-4"
            style={{
              backgroundColor: "#f8fafd",
              borderLeft: "4px solid #387ed1",
              borderRadius: "0 8px 8px 0",
            }}
          >
            <p
              className="fst-italic text-dark mb-1"
              style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
            >
              "We're not just building a brokerage tool; we're building a gateway for the next
              generation of thinkers, investors, and algorithmic creators to participate in wealth
              creation."
            </p>
            <small className="fw-semibold text-primary">— Divyanshu Tripathi</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;