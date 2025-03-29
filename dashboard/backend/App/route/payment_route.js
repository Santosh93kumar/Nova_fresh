const express = require("express");
const { newPayment, getPayment } = require("../controller/payment_controller");

const paymentRoute = express.Router();
paymentRoute.post("/new", newPayment);
paymentRoute.get("/", getPayment);

module.exports = paymentRoute;