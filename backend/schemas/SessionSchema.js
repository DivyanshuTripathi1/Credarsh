const { Schema } = require("mongoose");

const SessionSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 },
  },
});

module.exports = { SessionSchema };
