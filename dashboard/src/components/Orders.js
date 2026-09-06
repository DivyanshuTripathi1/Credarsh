import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  const fetchOrders = useCallback((showLoading = false) => {
    if (showLoading) setLoading(true);
    setError("");
    axios
      .get(`${API_URL}/allOrders`)
      .then((res) => {
        setAllOrders(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Could not fetch orders:", err);
        setError("Unable to load orders. Please make sure you are logged in.");
        setLoading(false);
      });
  }, []);

  // Fetch when component mounts or when navigating to this route
  useEffect(() => {
    fetchOrders(true);
  }, [fetchOrders, location.key, location.state]);

  // Listen for orderPlaced event to immediately update state without full page refresh
  useEffect(() => {
    const handleOrderPlaced = (event) => {
      if (event?.detail && event.detail._id) {
        setAllOrders((prev) => {
          const exists = prev.some((o) => o._id === event.detail._id);
          if (exists) return prev;
          return [event.detail, ...prev];
        });
      }
      fetchOrders(false);
    };

    window.addEventListener("orderPlaced", handleOrderPlaced);
    window.addEventListener("focus", () => fetchOrders(false));
    return () => {
      window.removeEventListener("orderPlaced", handleOrderPlaced);
      window.removeEventListener("focus", () => fetchOrders(false));
    };
  }, [fetchOrders]);

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await axios.delete(`${API_URL}/deleteOrder/${orderId}`);
      setAllOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Failed to cancel order:", err);
      alert("Failed to cancel order. Please try again.");
    }
  };

  if (loading) {
    return (
      <div
        className="orders"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <p style={{ color: "#888", fontSize: "14px" }}>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders">
        <div className="no-orders" style={{ textAlign: "center", padding: "40px 20px" }}>
          <p style={{ color: "#d93025" }}>{error}</p>
          <button
            onClick={fetchOrders}
            className="btn"
            style={{ border: "none", cursor: "pointer", marginTop: "12px" }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          marginTop: "15px",
        }}
      >
        <h3 className="title" style={{ margin: 0 }}>
          Orders ({allOrders.length})
        </h3>
        <button
          onClick={fetchOrders}
          style={{
            background: "none",
            border: "none",
            color: "#387ed1",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          Refresh
        </button>
      </div>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Instrument</th>
              <th>Product</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => {
              let formattedTime = "--:--:--";
              try {
                if (order.createdAt) {
                  formattedTime = new Date(order.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  });
                } else if (order._id && order._id.length === 24) {
                  const timestamp = new Date(
                    parseInt(order._id.substring(0, 8), 16) * 1000
                  );
                  formattedTime = timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  });
                }
              } catch (e) {}

              const mode = order.mode || "BUY";
              const isBuy = mode.toUpperCase() === "BUY";
              const price = Number(order.price) || 0;

              return (
                <tr key={order._id || index}>
                  <td className="order-time">{formattedTime}</td>
                  <td>
                    <span className={isBuy ? "order-mode-buy" : "order-mode-sell"}>
                      {mode.toUpperCase()}
                    </span>
                  </td>
                  <td className="order-instrument">{order.name}</td>
                  <td>CNC</td>
                  <td>{order.qty}</td>
                  <td>₹{price.toFixed(2)}</td>
                  <td>
                    <span className="order-status-complete">COMPLETE</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-order-cancel"
                      onClick={() => handleDeleteOrder(order._id)}
                      title="Cancel order"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;