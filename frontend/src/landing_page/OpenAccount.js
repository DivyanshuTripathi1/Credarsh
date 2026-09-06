import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { DASHBOARD_URL } from "../config";

function OpenAccount() {
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
        <h1 className="mt-4 mt-md-5 fs-2 fs-md-1">Open a Credarsh account</h1>
        <p className="fs-5 text-muted px-2">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        <button
          onClick={handleAction}
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "auto", minWidth: "180px", maxWidth: "260px", margin: "0 auto" }}
        >
          {isLoggedIn ? "Go to Kite" : "Sign up for free"}
        </button>
      </div>
    </div>
  );
}

export default OpenAccount;