const { Schema } = require("mongoose");

const OrdersSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    name: String,
    qty: Number,
    price: Number,
    mode: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = { OrdersSchema };