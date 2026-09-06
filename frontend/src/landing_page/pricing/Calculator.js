import React, { useState, useMemo } from "react";

const segments = [
  { id: "delivery", label: "Equity Delivery" },
  { id: "intraday", label: "Equity Intraday" },
  { id: "futures", label: "F&O - Futures" },
  { id: "options", label: "F&O - Options" },
];

function Calculator() {
  const [activeSegment, setActiveSegment] = useState("delivery");
  const [buyPrice, setBuyPrice] = useState(1000);
  const [sellPrice, setSellPrice] = useState(1100);
  const [quantity, setQuantity] = useState(100);

  const calculations = useMemo(() => {
    const buy = parseFloat(buyPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const qty = parseInt(quantity, 10) || 0;

    const buyTurnover = buy * qty;
    const sellTurnover = sell * qty;
    const turnover = buyTurnover + sellTurnover;
    const grossPnL = (sell - buy) * qty;

    let brokerage = 0;
    let stt = 0;
    let exchangeTxn = 0;
    let sebi = (turnover * 10) / 10000000; // ₹10 per crore
    let stampDuty = 0;

    if (activeSegment === "delivery") {
      brokerage = 0; // ₹0 for equity delivery
      stt = turnover * 0.001; // 0.1% on buy & sell
      exchangeTxn = turnover * 0.0000297; // NSE 0.00297%
      stampDuty = buyTurnover * 0.00015; // 0.015% on buy
    } else if (activeSegment === "intraday") {
      // 0.03% or ₹20 per executed order, whichever is lower
      const buyBrokerage = Math.min(buyTurnover * 0.0003, 20);
      const sellBrokerage = Math.min(sellTurnover * 0.0003, 20);
      brokerage = buyBrokerage + sellBrokerage;
      stt = sellTurnover * 0.00025; // 0.025% on sell
      exchangeTxn = turnover * 0.0000297;
      stampDuty = buyTurnover * 0.00003; // 0.003% on buy
    } else if (activeSegment === "futures") {
      const buyBrokerage = Math.min(buyTurnover * 0.0003, 20);
      const sellBrokerage = Math.min(sellTurnover * 0.0003, 20);
      brokerage = buyBrokerage + sellBrokerage;
      stt = sellTurnover * 0.0002; // 0.02% on sell
      exchangeTxn = turnover * 0.0000173; // 0.00173%
      stampDuty = buyTurnover * 0.00002; // 0.002% on buy
    } else if (activeSegment === "options") {
      brokerage = 40; // Flat ₹20 buy + ₹20 sell
      stt = sellTurnover * 0.001; // 0.1% on sell premium
      exchangeTxn = turnover * 0.0003503; // 0.03503% on premium
      stampDuty = buyTurnover * 0.00003; // 0.003% on buy
    }

    const gst = (brokerage + exchangeTxn + sebi) * 0.18; // 18% GST
    const totalTaxAndCharges = brokerage + stt + exchangeTxn + gst + sebi + stampDuty;
    const netPnL = grossPnL - totalTaxAndCharges;
    const breakeven = qty > 0 ? (totalTaxAndCharges / qty).toFixed(2) : "0.00";

    return {
      turnover: turnover.toFixed(2),
      grossPnL: grossPnL.toFixed(2),
      brokerage: brokerage.toFixed(2),
      stt: stt.toFixed(2),
      exchangeTxn: exchangeTxn.toFixed(2),
      gst: gst.toFixed(2),
      sebi: sebi.toFixed(2),
      stampDuty: stampDuty.toFixed(2),
      totalCharges: totalTaxAndCharges.toFixed(2),
      netPnL: netPnL.toFixed(2),
      breakeven,
      isProfit: netPnL >= 0,
    };
  }, [activeSegment, buyPrice, sellPrice, quantity]);

  return (
    <section id="calculator" className="container py-4 py-md-5">
      {/* Title */}
      <div className="text-center mb-4">
        <span
          style={{
            display: "inline-block",
            fontSize: "0.78rem",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#387ed1",
            backgroundColor: "#ebf4fe",
            padding: "5px 14px",
            borderRadius: "50px",
            marginBottom: "10px",
          }}
        >
          Transparent Pricing
        </span>
        <h2 className="fw-bold text-dark fs-2">Brokerage &amp; Charges Calculator</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "620px", fontSize: "0.95rem" }}>
          Calculate your exact trading charges, regulatory taxes, and net P&amp;L before
          executing any trade.
        </p>
      </div>

      {/* Segment Navigation Tabs */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
        {segments.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveSegment(s.id)}
            style={{
              padding: "9px 20px",
              borderRadius: "24px",
              fontSize: "0.88rem",
              fontWeight: "500",
              cursor: "pointer",
              border: activeSegment === s.id ? "1px solid #387ed1" : "1px solid #e2e8f0",
              backgroundColor: activeSegment === s.id ? "#387ed1" : "#ffffff",
              color: activeSegment === s.id ? "#ffffff" : "#475569",
              transition: "all 0.15s ease",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="row g-4 justify-content-center">
        {/* Left Card: User Inputs */}
        <div className="col-12 col-lg-5">
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "26px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
              height: "100%",
            }}
          >
            <h4 className="fw-semibold text-dark mb-4 fs-5">Trade Details</h4>

            {/* Buy Price Input */}
            <div className="mb-3">
              <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.82rem" }}>
                BUY PRICE (₹)
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted border-end-0">₹</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  className="form-control"
                  style={{ fontSize: "1rem", fontWeight: "500" }}
                />
              </div>
            </div>

            {/* Sell Price Input */}
            <div className="mb-3">
              <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.82rem" }}>
                SELL PRICE (₹)
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted border-end-0">₹</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  className="form-control"
                  style={{ fontSize: "1rem", fontWeight: "500" }}
                />
              </div>
            </div>

            {/* Quantity Input */}
            <div className="mb-4">
              <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.82rem" }}>
                QUANTITY (SHARES / LOTS)
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
                style={{ fontSize: "1rem", fontWeight: "500" }}
              />
            </div>

            {/* Quick Presets */}
            <div className="pt-2 border-top">
              <span className="text-muted d-block mb-2" style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>
                Quick Quantity Presets:
              </span>
              <div className="d-flex gap-2">
                {[50, 100, 250, 500].map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setQuantity(qty)}
                    style={{
                      border: "1px solid #cbd5e1",
                      backgroundColor: quantity === qty ? "#eff6ff" : "#ffffff",
                      color: quantity === qty ? "#387ed1" : "#475569",
                      borderRadius: "4px",
                      padding: "4px 12px",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    {qty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Calculation & Breakdown */}
        <div className="col-12 col-lg-7">
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "26px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
            }}
          >
            {/* Top Net P&L Banner */}
            <div
              className="p-3 rounded-3 mb-4 d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: calculations.isProfit ? "#f0fdf4" : "#fef2f2",
                border: calculations.isProfit ? "1px solid #bbf7d0" : "1px solid #fecaca",
              }}
            >
              <div>
                <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>
                  Net P&amp;L (After Charges)
                </span>
                <h3
                  className="m-0 fw-bold"
                  style={{
                    color: calculations.isProfit ? "#16a34a" : "#dc2626",
                    fontSize: "1.8rem",
                  }}
                >
                  {calculations.isProfit ? "+" : ""}₹{calculations.netPnL}
                </h3>
              </div>
              <div className="text-end">
                <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>
                  Breakeven
                </span>
                <p className="m-0 fw-semibold text-dark fs-5">
                  ₹{calculations.breakeven} <span style={{ fontSize: "0.8rem", color: "#64748b" }}>pts</span>
                </p>
              </div>
            </div>

            {/* Breakdown Table */}
            <h5 className="fw-semibold text-dark mb-3 fs-6">Charges &amp; Taxes Breakdown</h5>
            <div className="table-responsive">
              <table className="table table-sm table-borderless mb-2" style={{ fontSize: "0.88rem" }}>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td className="text-muted py-2">Turnover</td>
                    <td className="text-end fw-semibold py-2">₹{calculations.turnover}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td className="text-muted py-2">Gross P&amp;L</td>
                    <td className="text-end fw-semibold py-2">
                      {parseFloat(calculations.grossPnL) >= 0 ? "+" : ""}₹{calculations.grossPnL}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td className="text-muted py-2">
                      Brokerage{" "}
                      {activeSegment === "delivery" && (
                        <span className="badge bg-success-subtle text-success ms-1">FREE</span>
                      )}
                    </td>
                    <td className="text-end py-2">₹{calculations.brokerage}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td className="text-muted py-2">STT / CTT Total</td>
                    <td className="text-end py-2">₹{calculations.stt}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td className="text-muted py-2">Exchange Turnover Charges</td>
                    <td className="text-end py-2">₹{calculations.exchangeTxn}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td className="text-muted py-2">GST (18%)</td>
                    <td className="text-end py-2">₹{calculations.gst}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td className="text-muted py-2">SEBI Turnover Charges</td>
                    <td className="text-end py-2">₹{calculations.sebi}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td className="text-muted py-2">Stamp Duty</td>
                    <td className="text-end py-2">₹{calculations.stampDuty}</td>
                  </tr>
                  <tr style={{ borderTop: "2px solid #e2e8f0" }}>
                    <td className="fw-bold text-dark py-2">Total Tax &amp; Charges</td>
                    <td className="text-end fw-bold text-danger py-2">
                      ₹{calculations.totalCharges}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
              * Calculated based on standard NSE/BSE charges and SEBI regulations. Stamp duty is levied on buy side only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calculator;
