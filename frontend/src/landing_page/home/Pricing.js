import React from "react";

function Pricing() {
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-12 col-lg-5 mb-4 mb-lg-0">
          <h1 className="mb-3 fs-2">Unbeatable pricing</h1>
          <p className="text-muted">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            See Pricing{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
        <div className="col-12 col-lg-7">
          <div className="row text-center g-3">
            <div className="col-12 col-sm-6">
              <div className="p-4 border rounded-1">
                <h1 className="mb-2">₹0</h1>
                <p className="text-muted mb-0">
                  Free equity delivery and
                  <br />
                  direct mutual funds
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="p-4 border rounded-1">
                <h1 className="mb-2">₹20</h1>
                <p className="text-muted mb-0">Intraday and F&O</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;