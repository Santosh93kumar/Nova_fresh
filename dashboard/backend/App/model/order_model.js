const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    order_id: String,
    date: String,
    customer_name: String,
    items: Number,
    paid: {
        type: String,
        enum: ['yes', 'no'],
        default: 'no'
    },
    status: String,
    spent: Number,
});

const Order = mongoose.model("order",orderSchema);
module.exports = {Order}