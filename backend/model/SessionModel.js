const { model } = require("mongoose");
const { SessionSchema } = require("../schemas/SessionSchema");

const SessionModel = model("session", SessionSchema);

module.exports = { SessionModel };
