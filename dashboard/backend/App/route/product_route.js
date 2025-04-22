const express = require("express");
const { newProduct, getProducts, deleteProduct, searchProduct, getProductbById, updateProduct } = require("../controller/product_controller");
const { uploads } = require("../middleware/fileUpload");

const productRoute = express.Router();
productRoute.post("/new", uploads("uploads/").array("images", 10), newProduct);
productRoute.get("/", getProducts);
productRoute.delete("/delete/:id", deleteProduct);
productRoute.get("/search", searchProduct);
productRoute.get("/get/:id", getProductbById); 
productRoute.post("/update/:id",updateProduct)

module.exports = productRoute;