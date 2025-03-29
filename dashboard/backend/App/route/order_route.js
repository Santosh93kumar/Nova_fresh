const express = require("express");
const { newOrder, getOrders } = require("../controller/order_controller");

const orderRoute = express.Router();
orderRoute.post("/new", newOrder);
orderRoute.get("/", getOrders);

module.exports = orderRoute;