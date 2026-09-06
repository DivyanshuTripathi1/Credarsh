import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import { DASHBOARD_URL } from "../../config";

function Hero() {
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
    <div className="container p-3 p-md-5 mb-5">
      <div className="row text-center">
        <img
          src="media/images/homeHero.png"
          alt="Hero Image"
          className="mb-4 mb-md-5 img-fluid mx-auto"
          style={{ maxHeight: "420px", objectFit: "contain" }}
        />
        <h1 className="mt-3 mt-md-4 fs-2 fs-md-1">Invest in everything</h1>
        <p className="fs-5 text-muted px-2">
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
        <button
          onClick={handleAction}
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "auto", minWidth: "180px", maxWidth: "260px", margin: "0 auto" }}
        >
          {isLoggedIn ? "Go to Kite" : "Signup Now"}
        </button>
      </div>
    </div>
  );
}

export default Hero;
