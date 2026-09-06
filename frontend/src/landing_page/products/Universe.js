import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import { DASHBOARD_URL } from "../../config";

function Universe() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleAction = () => {
    if (isLoggedIn) {
      window.location.href = `${DASHBOARD_URL}/`;
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="container mt-4 mt-md-5">
      <div className="row text-center">
        <h1 className="fs-2">The Credarsh Universe</h1>
        <p className="text-muted px-2">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-12 col-sm-6 col-lg-4 p-3 mt-3 mt-md-4">
          <img
            src="media/images/credarshfundhouse.png"
            alt="Credarsh Fund House"
            className="img-fluid mb-2"
            style={{ maxHeight: "55px" }}
          />
          <p className="text-small text-muted mt-2">
            Our asset management venture creating simple and transparent index
            funds to help you save for your goals.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 p-3 mt-3 mt-md-4">
          <img
            src="media/images/sensibullLogo.svg"
            alt="Sensibull"
            className="img-fluid mb-2"
            style={{ maxHeight: "40px" }}
          />
          <p className="text-small text-muted mt-2">
            Options trading platform that lets you create strategies, analyse
            positions, and examine data points like open interest, FII/DII and
            more.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 p-3 mt-3 mt-md-4">
          <img
            src="media/images/smallcaseLogo.png"
            alt="Smallcase"
            className="img-fluid mb-2"
            style={{ maxHeight: "45px" }}
          />
          <p className="text-small text-muted mt-2">
            Thematic investing platform that helps you invest in diversified
            baskets of stock on ETFs.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 p-3 mt-3 mt-md-4">
          <img
            src="media/images/tijori.svg"
            alt="Tijori"
            className="img-fluid mb-2"
            style={{ maxHeight: "45px" }}
          />
          <p className="text-small text-muted mt-2">
            Investment research platform that offers detailed insights on stocks,
            sectors, supply chains, and more.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 p-3 mt-3 mt-md-4">
          <img
            src="media/images/dittoLogo.png"
            alt="Ditto"
            className="img-fluid mb-2"
            style={{ maxHeight: "45px" }}
          />
          <p className="text-small text-muted mt-2">
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 p-3 mt-3 mt-md-4">
          <img
            src="media/images/streakLogo.png"
            alt="Streak"
            className="img-fluid mb-2"
            style={{ maxHeight: "45px" }}
          />
          <p className="text-small text-muted mt-2">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>
        <div className="col-12 mt-4 mb-5">
          <button
            onClick={handleAction}
            className="p-2 btn btn-primary fs-5"
            style={{ width: "auto", minWidth: "180px", maxWidth: "260px", margin: "0 auto" }}
          >
            {isLoggedIn ? "Go to Kite" : "Signup Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Universe;