import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const initialStock = watchlist.find((item) => item.name === uid);
  const defaultPrice = initialStock ? initialStock.price : 0.0;

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(defaultPrice);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { closeBuyWindow } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleBuyClick = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API_URL}/newOrder`, {
        name: uid,
        qty: Number(stockQuantity) || 1,
        price: Number(stockPrice) || defaultPrice,
        mode: "BUY",
      });

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("orderPlaced", { detail: res.data?.order })
        );
        window.dispatchEvent(
          new CustomEvent("switchMobileTab", { detail: "content" })
        );
      }

      closeBuyWindow();
      navigate("/orders", { state: { updated: Date.now() } });
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  const marginRequired = (
    (Number(stockQuantity) || 0) * (Number(stockPrice) || 0)
  ).toFixed(2);

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{marginRequired}</span>
        <div>
          <button
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing..." : "Buy"}
          </button>
          <button
            className="btn btn-grey"
            onClick={handleCancelClick}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;