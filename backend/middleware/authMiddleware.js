const { SessionModel } = require("../model/SessionModel");
const { UserModel } = require("../model/UserModel");

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Try to read sessionId from cookies, Authorization header, or x-session-id
    let sessionId = req.cookies?.sessionId;
    if (!sessionId && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        sessionId = parts[1];
      }
    }
    if (!sessionId && req.headers["x-session-id"]) {
      sessionId = req.headers["x-session-id"];
    }

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    // 2. Validate session in MongoDB
    const session = await SessionModel.findOne({ sessionId });
    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Invalid session. Please log in again.",
      });
    }

    // 3. Check expiration
    if (session.expiresAt && session.expiresAt < new Date()) {
      await SessionModel.deleteOne({ _id: session._id });
      res.clearCookie("sessionId", { httpOnly: true, sameSite: "lax" });
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }

    // 4. Find user associated with session (excluding password)
    const user = await UserModel.findById(session.userId).select("-password");
    if (!user) {
      await SessionModel.deleteOne({ _id: session._id });
      res.clearCookie("sessionId", { httpOnly: true, sameSite: "lax" });
      return res.status(401).json({
        success: false,
        message: "User not found. Session terminated.",
      });
    }

    // 5. Attach user and session to request
    req.user = user;
    req.session = session;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication.",
    });
  }
};

module.exports = { authMiddleware };
