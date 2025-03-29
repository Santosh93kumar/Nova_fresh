const {Order} = require("../model/order_model");

const newOrder = async (req, res) => {
  const { order_id, date, customer_name, items, paid, status, spent } = req.body;

  try {
    const newOrder = new Order({
      order_id,
      date,
      customer_name,
      items,
      paid,
      status,
      spent,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

module.exports = {
  newOrder,
  getOrders,
};
