const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    pname: String,
    short_description: String,
    long_description: String,
    stock: Number,
    price: Number,
    discount: Number,
    discount_date: Date,
    category: String,
    visibility: String,
    scheduled_date: Date,
    images: [String], // Ensure images is an array if storing multiple filenames
});

module.exports = mongoose.model("Product", productSchema);
