import React, { useState } from "react";

const supportCategories = [
  {
    id: "account-opening",
    title: "Account Opening & KYC",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7.5" r="4"></circle>
        <line x1="20" y1="8" x2="20" y2="14"></line>
        <line x1="23" y1="11" x2="17" y2="11"></line>
      </svg>
    ),
    topics: [
      {
        question: "Online Demat & Trading Account Opening",
        answer:
          "Open your paperless account online in 10 minutes using your Aadhaar-linked mobile number for OTP eSign, PAN card, and bank account details.",
      },
      {
        question: "Offline Paper Account Opening",
        answer:
          "Download the application PDF from our portal, sign the physical forms, attach self-attested copies of PAN and address proof, and courier them to our registered office.",
      },
      {
        question: "Company, Partnership, LLP & HUF Accounts",
        answer:
          "Non-individual accounts require specialized entity documentation (incorporation certificate, board resolution, and partner/promoter KYC).",
      },
      {
        question: "NRI, OCI & Foreign National Accounts",
        answer:
          "NRIs can open accounts linked to NRE or NRO bank accounts with a valid PIS (Portfolio Investment Scheme) letter or non-PIS route.",
      },
      {
        question: "Account Opening Charges & AMC Plans",
        answer:
          "Equity delivery and direct mutual funds are free (₹0 brokerage). Demat maintenance charge (AMC) is zero for basic services accounts under ₹4 lakh holdings.",
      },
      {
        question: "Document Verification Status Check",
        answer:
          "Once you submit your application, our compliance desk verifies documents within 24 to 48 business hours. You'll receive credentials via email and SMS.",
      },
    ],
  },
  {
    id: "account-security",
    title: "Your Account & Security",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
    topics: [
      {
        question: "Login Issues, Password & 2FA / TOTP Reset",
        answer:
          "If locked out, click 'Forgot Password' on the login screen. You can reset 2FA via SMS OTP verification and re-scan the QR code using Google Authenticator.",
      },
      {
        question: "Changing Registered Mobile & Email Address",
        answer:
          "Go to Profile > Personal Details > Edit. You will need to verify OTPs on both your existing and new contact details.",
      },
      {
        question: "Adding or Modifying Linked Bank Accounts",
        answer:
          "Submit a bank modification request from Console > Account > Bank. Upload a cancelled cheque or bank statement with IFSC and name clearly visible.",
      },
      {
        question: "Adding Nominee to Demat Account",
        answer:
          "You can nominate up to 3 nominees online by entering their identity proof and percentage share under Profile > Nominees with an eSign OTP.",
      },
      {
        question: "Re-KYC and Periodic CKYC Update",
        answer:
          "SEBI mandates periodic KYC refresh. If notified, simply re-confirm your current address and occupation through DigiLocker online.",
      },
      {
        question: "Account Deactivation & Closure Procedure",
        answer:
          "Ensure your account has zero fund balance and zero holdings before submitting an eSigned online account closure request.",
      },
    ],
  },
  {
    id: "trading-markets",
    title: "Trading & Orders (Kite)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
        <polyline points="16 7 22 7 22 13"></polyline>
      </svg>
    ),
    topics: [
      {
        question: "Margin Calculator & Intraday Leverages",
        answer:
          "Intraday MIS equity cash orders receive up to 5x leverage. F&O margins are dynamically computed based on exchange SPAN + Exposure rules.",
      },
      {
        question: "Order Types: Market, Limit, SL, GTT & AMO",
        answer:
          "Use Limit orders to buy at a specific price, GTT (Good Till Triggered) for 1-year valid conditional orders, and AMO for placing trades after market hours.",
      },
      {
        question: "F&O, Currency & Commodity Segment Activation",
        answer:
          "Activate derivatives under Profile > Segments by uploading your latest 6-month bank statement with minimum ₹10,000 balance or latest ITR acknowledgement.",
      },
      {
        question: "TradingView & ChartIQ Technical Charts",
        answer:
          "Switch between TradingView and ChartIQ chart engines in your account settings. Over 100+ technical indicators and drawing tools are included for free.",
      },
      {
        question: "Circuit Limits & Trading Halts",
        answer:
          "Exchange upper and lower price bands prevent extreme volatility. Orders outside circuit limits are automatically rejected by the exchange.",
      },
      {
        question: "Kite Mobile & Web Troubleshooting",
        answer:
          "If experiencing latency, check network connection, clear browser cache, or ensure the mobile app is updated to the latest release.",
      },
    ],
  },
  {
    id: "funds-banking",
    title: "Funds & Payments",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
      </svg>
    ),
    topics: [
      {
        question: "Adding Funds via UPI, Netbanking & NEFT",
        answer:
          "UPI deposits are 100% free and instant. Funds transferred via Netbanking reflect within 5 minutes. NEFT/RTGS transfers take 2 to 4 hours.",
      },
      {
        question: "Fund Withdrawal Timings & Cut-off Times",
        answer:
          "Withdrawal requests placed before 8:30 PM on weekdays are processed the same night and credited to your primary bank account by the next morning.",
      },
      {
        question: "Instant Withdrawal Rules & Daily Limits",
        answer:
          "Instant withdrawal allows up to ₹25,000 per day credited within 10 minutes between 9:00 AM and 4:30 PM on trading days.",
      },
      {
        question: "Bank Holiday & Settlement Cycles",
        answer:
          "Indian stock markets follow a T+1 settlement cycle. Proceeds from stock sales on Monday are settled and withdrawable on Tuesday evening.",
      },
      {
        question: "Payment Gateway Charges & Refunds",
        answer:
          "UPI has ₹0 gateway fee. Netbanking transfers have a nominal ₹9 gateway fee levied by payment aggregators.",
      },
      {
        question: "Failed Transactions & Reversals",
        answer:
          "If funds are debited from your bank but not added to your trading balance, your bank automatically reverses the amount within 24 to 48 banking hours.",
      },
    ],
  },
  {
    id: "console-reports",
    title: "Console & Reports",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    topics: [
      {
        question: "Tax P&L Report Download for ITR Filing",
        answer:
          "Navigate to Console > Reports > Tax P&L, select the financial year, and download pre-computed short-term, long-term capital gains, and intraday P&L reports.",
      },
      {
        question: "Contract Notes & Daily Trade Book",
        answer:
          "Digital contract notes are emailed at the end of each trading day and permanently archived under Console > Reports > Contract Notes.",
      },
      {
        question: "Portfolio Holdings & Demat Transaction Statements",
        answer:
          "Download consolidated holding statements with ISIN, quantity, buy price, and current market valuations in Excel or PDF format.",
      },
      {
        question: "Dividend Credits & Corporate Action Entitlements",
        answer:
          "Dividends declared by companies are credited directly to your primary bank account on the record date.",
      },
      {
        question: "Ledger Statements & Financial Statements",
        answer:
          "Inspect running balance, payins, payouts, and exchange turnover charges under Console > Funds > Statement.",
      },
      {
        question: "Margin Statements & Peak Margin Reports",
        answer:
          "Daily margin statements show peak margin requirements and overnight margin utilization across all executed positions.",
      },
    ],
  },
  {
    id: "coin-investments",
    title: "Coin & Mutual Funds",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
        <path d="M12 18V6"></path>
      </svg>
    ),
    topics: [
      {
        question: "Starting, Modifying & Pausing SIPs",
        answer:
          "Invest in direct mutual funds through systematic investment plans (SIP). You can increase installment amounts, pause, or cancel SIPs anytime without penalties.",
      },
      {
        question: "Direct Mutual Funds Zero Commission",
        answer:
          "All mutual funds on our platform are direct plans with 0% distributor commission, resulting in higher compounding returns over time.",
      },
      {
        question: "Sovereign Gold Bonds (SGB) Applications",
        answer:
          "Apply for RBI Sovereign Gold Bond tranches with a ₹50/gram discount and earn 2.5% fixed annual interest credited semi-annually.",
      },
      {
        question: "National Pension System (NPS) Accounts",
        answer:
          "Invest in Tier-1 and Tier-2 NPS retirement schemes to save additional income tax under section 80CCD(1B).",
      },
      {
        question: "Mutual Fund Redemption & NAV Dates",
        answer:
          "Redemption orders placed before 1:00 PM receive that day's NAV. Equity fund proceeds are credited within T+2 working days.",
      },
      {
        question: "Mandate Setup & Net Banking e-NACH",
        answer:
          "Set up an automated e-mandate via debit card or netbanking authentication so your recurring monthly SIPs auto-debit seamlessly.",
      },
    ],
  },
];

function CreateTicket({ searchQuery = "", onResetSearch, onTagClick }) {
  const [expandedTopic, setExpandedTopic] = useState(null);
  const query = searchQuery.trim().toLowerCase();

  // Filter categories and topics based on search query
  const filteredCategories = supportCategories
    .map((cat) => {
      const matchingTopics = cat.topics.filter(
        (t) =>
          t.question.toLowerCase().includes(query) ||
          t.answer.toLowerCase().includes(query) ||
          cat.title.toLowerCase().includes(query)
      );
      return {
        ...cat,
        topics: query ? matchingTopics : cat.topics,
      };
    })
    .filter((cat) => cat.topics.length > 0);

  const totalMatching = filteredCategories.reduce(
    (acc, cat) => acc + cat.topics.length,
    0
  );

  const toggleTopic = (question) => {
    setExpandedTopic(expandedTopic === question ? null : question);
  };

  return (
    <div className="container py-4 py-md-5">
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
        <div>
          <h2 className="fs-3 fw-bold text-dark mb-1">
            Browse Help Topics &amp; FAQs
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: "0.92rem" }}>
            Select any topic to view instant resolutions, guides, and answers.
          </p>
        </div>

        {query && (
          <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
            <span
              style={{
                backgroundColor: "#e0f2fe",
                color: "#0369a1",
                padding: "4px 12px",
                borderRadius: "16px",
                fontSize: "0.82rem",
                fontWeight: "500",
              }}
            >
              Found {totalMatching} topic{totalMatching === 1 ? "" : "s"} for "{searchQuery}"
            </span>
            <button
              type="button"
              onClick={onResetSearch}
              style={{
                background: "transparent",
                border: "1px solid #cbd5e1",
                color: "#64748b",
                padding: "3px 10px",
                borderRadius: "14px",
                fontSize: "0.78rem",
                cursor: "pointer",
              }}
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>

      {/* Grid of Categories */}
      {filteredCategories.length === 0 ? (
        <div
          style={{
            padding: "48px 24px",
            textAlign: "center",
            backgroundColor: "#f8fafc",
            borderRadius: "10px",
            border: "1px dashed #cbd5e1",
            margin: "24px 0",
          }}
        >
          <h4 className="fw-semibold text-dark mb-2">No matching topics found</h4>
          <p className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
            We couldn't find any help articles matching "{searchQuery}".
          </p>
          <button
            type="button"
            onClick={onResetSearch}
            style={{
              backgroundColor: "#387ed1",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              padding: "9px 20px",
              fontWeight: "600",
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            View All Help Topics
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredCategories.map((category) => (
            <div key={category.id} className="col-12 col-md-6 col-lg-4">
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "24px",
                  height: "100%",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                {/* Category Title */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      backgroundColor: "#eff6ff",
                      color: "#387ed1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {category.icon}
                  </span>
                  <h3
                    className="m-0 fw-bold"
                    style={{ fontSize: "1.05rem", color: "#1e293b" }}
                  >
                    {category.title}
                  </h3>
                </div>

                {/* Topics with Expandable Answers */}
                <div className="d-flex flex-column gap-2 mt-2">
                  {category.topics.map((t, idx) => {
                    const isExpanded = expandedTopic === t.question;
                    return (
                      <div
                        key={idx}
                        style={{
                          borderBottom: "1px solid #f8fafc",
                          paddingBottom: "6px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => toggleTopic(t.question)}
                          style={{
                            background: "transparent",
                            border: "none",
                            textAlign: "left",
                            padding: "6px 4px",
                            color: isExpanded ? "#1d4ed8" : "#3b82f6",
                            fontSize: "0.88rem",
                            lineHeight: "1.45",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: "8px",
                            width: "100%",
                            fontWeight: isExpanded ? "600" : "400",
                          }}
                        >
                          <span>{t.question}</span>
                          <span
                            style={{
                              fontSize: "0.75rem",
                              color: "#94a3b8",
                              marginTop: "2px",
                              transform: isExpanded ? "rotate(90deg)" : "none",
                              transition: "transform 0.15s ease",
                            }}
                          >
                            ▶
                          </span>
                        </button>

                        {/* Expandable Resolution */}
                        {isExpanded && (
                          <div
                            style={{
                              backgroundColor: "#f8fafd",
                              borderLeft: "3px solid #387ed1",
                              padding: "10px 12px",
                              borderRadius: "0 6px 6px 0",
                              marginTop: "4px",
                              marginBottom: "8px",
                              fontSize: "0.82rem",
                              lineHeight: "1.5",
                              color: "#475569",
                            }}
                          >
                            {t.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Helpful Contact Banner */}
      <div
        className="mt-5 p-4 text-center"
        style={{
          backgroundColor: "#f8fafd",
          borderRadius: "10px",
          border: "1px solid #e0eefc",
        }}
      >
        <h4 className="fw-bold text-dark mb-2" style={{ fontSize: "1.15rem" }}>
          Need Further Clarification?
        </h4>
        <p className="text-muted mb-3 mx-auto" style={{ maxWidth: "560px", fontSize: "0.9rem" }}>
          Our support representatives and market specialists are available Monday to Friday
          from 8:30 AM to 6:00 PM at <strong>080 4718 1888</strong>.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
            Average Call Wait Time: <strong>&lt; 2 mins</strong>
          </span>
          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>•</span>
          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
            Operational Trading Days: <strong>Mon - Fri</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;