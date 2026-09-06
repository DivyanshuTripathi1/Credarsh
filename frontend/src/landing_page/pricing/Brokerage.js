import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-3 p-md-5 mt-3 mt-md-5 text-center border-top">
        <div className="col-12 col-md-8 p-3 p-md-4 text-start">
          <a href="#calculator" style={{ textDecoration: "none" }}>
            <h3 className="fs-5 mb-3 text-primary">Brokerage calculator ↑</h3>
          </a>
          <ul
            style={{ lineHeight: "2.2", fontSize: "13px" }}
            className="text-muted"
          >
            <li>
              Call & Trade and RMS auto-squareoff: Additional charges of ₹50 +
              GST per order.
            </li>
            <li>Digital contract notes will be sent via e-mail.</li>
            <li>
              Physical copies of contract notes, if required, shall be charged
              ₹20 per contract note. Courier charges apply.
            </li>
            <li>
              For NRI account (non-PIS), 0.5% or ₹100 per executed order for
              equity (whichever is lower).
            </li>
            <li>
              For NRI account (PIS), 0.5% or ₹200 per executed order for equity
              (whichever is lower).
            </li>
            <li>
              If the account is in debit balance, any order placed will be
              charged ₹40 per executed order instead of ₹20 per executed order.
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-4 p-3 p-md-4 text-center text-md-start">
          <a href="#calculator" style={{ textDecoration: "none" }}>
            <h3 className="fs-5 text-primary">List of charges</h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;