import React from "react";

function Awards() {
  return (
    <div className="container mt-4 mt-md-5">
      <div className="row align-items-center">
        <div className="col-12 col-lg-6 p-3 p-md-5 text-center">
          <img
            src="media/images/largestBroker.svg"
            alt="Largest Broker"
            className="img-fluid"
            style={{ maxWidth: "100%", maxHeight: "420px" }}
          />
        </div>
        <div className="col-12 col-lg-6 p-3 p-md-5 mt-2 mt-lg-0">
          <h1 className="fs-2">Largest stock broker in India</h1>
          <p className="mb-4 text-muted">
            2+ million Credarsh clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>
          <div className="row">
            <div className="col-12 col-sm-6">
              <ul>
                <li>
                  <p>Futures and Options</p>
                </li>
                <li>
                  <p>Commodity derivatives</p>
                </li>
                <li>
                  <p>Currency derivatives</p>
                </li>
              </ul>
            </div>
            <div className="col-12 col-sm-6">
              <ul>
                <li>
                  <p>Stocks & IPOs</p>
                </li>
                <li>
                  <p>Direct mutual funds</p>
                </li>
                <li>
                  <p>Bonds and Govt. Securities</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-lg-start mt-3">
            <img
              src="media/images/pressLogos.png"
              alt="Press Logos"
              className="img-fluid"
              style={{ width: "100%", maxWidth: "480px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;