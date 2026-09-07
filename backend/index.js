require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");
const { SessionModel } = require("./model/SessionModel");
const { authMiddleware } = require("./middleware/authMiddleware");

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL || process.env.MONGODB_URI;
const isProduction = process.env.NODE_ENV === "production";

const app = express();

// Trust reverse proxy (Render, Railway, Heroku, AWS, Nginx) so HTTPS cookies work
if (isProduction) {
  app.set("trust proxy", 1);
}

const envOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim())
  : [];

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,
  ...envOrigins,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server or requests without origin (curl, mobile apps)
      if (!origin) return callback(null, true);

      // Match explicitly allowed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow any Amplify hosting domains
      if (origin.endsWith(".amplifyapp.com")) {
        return callback(null, true);
      }

      // Allow any localhost port in development
      if (
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:")
      ) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

// Health check endpoint for cloud deployment platforms (Render, Railway, etc.)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

const getCookieOptions = () => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: SESSION_EXPIRY_MS,
  path: "/",
});

const createSessionAndSetCookie = async (userId, res) => {
  const sessionId = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_MS);

  await SessionModel.create({
    sessionId,
    userId,
    expiresAt,
  });

  res.cookie("sessionId", sessionId, getCookieOptions());

  return sessionId;
};

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];
//
//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });
//
//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];
//
//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });
//
//     newPosition.save();
//   });
//   res.send("Done!");
// });

app.get("/allHoldings", authMiddleware, async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/allPositions", authMiddleware, async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/allOrders", authMiddleware, async (req, res) => {
  try {
    let allOrders = await OrdersModel.find({
      userId: req.user._id,
    }).sort({ _id: -1 });
    res.json(allOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/newOrder", authMiddleware, async (req, res) => {
  try {
    const qty = Number(req.body.qty);
    const price = Number(req.body.price);

    if (!req.body.name || isNaN(qty) || qty <= 0 || isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "Invalid order name, quantity, or price." });
    }

    let newOrder = new OrdersModel({
      userId: req.user._id,
      name: req.body.name,
      qty,
      price,
      mode: req.body.mode || "BUY",
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order saved!",
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/deleteOrder/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await OrdersModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Order not found or unauthorized." });
    }

    res.json({ success: true, message: "Order deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "Email, username, and password are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await UserModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      email: normalizedEmail,
      username: username.trim(),
      password: hashedPassword,
    });
    await newUser.save();

    const sessionId = await createSessionAndSetCookie(newUser._id, res);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      sessionId,
      user: {
        id: newUser._id.toString(),
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error during signup." });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await UserModel.findOne({ email: normalizedEmail });

    // Prevent account enumeration by providing constant generic message
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const sessionId = await createSessionAndSetCookie(user._id, res);

    res.json({
      success: true,
      message: "Login successful",
      sessionId,
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error during login." });
  }
});

// Current User Profile Route
app.get("/me", authMiddleware, async (req, res) => {
  res.json({
    success: true,
    sessionId: req.session?.sessionId,
    user: {
      id: req.user._id.toString(),
      email: req.user.email,
      username: req.user.username,
    },
  });
});

app.get("/check-auth", authMiddleware, async (req, res) => {
  res.json({
    authenticated: true,
    user: {
      id: req.user._id.toString(),
      email: req.user.email,
      username: req.user.username,
    },
  });
});

// Logout Route
app.post("/logout", async (req, res) => {
  try {
    const sessionId =
      req.cookies?.sessionId ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]) ||
      req.headers["x-session-id"];

    if (sessionId) {
      await SessionModel.deleteOne({ sessionId });
    }

    res.clearCookie("sessionId", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    res.json({ success: true, message: "Logged out successfully." });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Error during logout." });
  }
});

// Legacy User Route (protected by authMiddleware)
app.get("/user/:id", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json({
      id: user._id.toString(),
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

if (uri) {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err);
    });
} else {
  console.warn("WARNING: MONGO_URL / MONGODB_URI environment variable is not defined!");
}