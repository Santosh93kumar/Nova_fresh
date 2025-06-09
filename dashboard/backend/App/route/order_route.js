const express = require("express");
const { newOrder, getOrders, getUserOrders, updateOrderStatus } = require("../controller/order_controller.js");
const { authenticateUser } = require("../middleware/authMiddleware.js");

const orderRoute = express.Router();
orderRoute.post("/new", newOrder);
orderRoute.get("/", getOrders);
orderRoute.get("/user/:userId", authenticateUser, getUserOrders);
orderRoute.patch("/status/:orderId", authenticateUser, updateOrderStatus);

module.exports = orderRoute;