const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  order_id: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  date: String,
  customer_name: String,
  items: Number,
  paid: {
    type: String,
    enum: ["yes", "no"],
    default: "no",
  },
  status: String,
  spent: Number,
});

const Order = mongoose.model("order", orderSchema);
module.exports = { Order };
