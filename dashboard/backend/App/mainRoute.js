let express = require("express");
const  userRoute  = require("./route/user_route");
const  productRoute  = require("./route/product_route");
const orderRoute = require("./route/order_route");

let mainRoute = express.Router();

mainRoute.use("/user",userRoute)
mainRoute.use("/product",productRoute)
mainRoute.use("/order",orderRoute)

module.exports = { mainRoute }