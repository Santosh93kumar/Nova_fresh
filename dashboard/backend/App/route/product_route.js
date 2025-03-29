const express = require("express");
const { newProduct, getProducts, deleteProduct, searchProduct } = require("../controller/product_controller");
const { uploads } = require("../middleware/fileUpload");

const productRoute = express.Router();
productRoute.post("/new", uploads("uploads/").array("images", 10), newProduct);
productRoute.get("/", getProducts);
productRoute.delete("/delete", deleteProduct);
productRoute.get("/search", searchProduct);

module.exports = productRoute;