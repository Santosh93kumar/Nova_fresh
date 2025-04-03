const { Order } = require("../model/order_model");
const UserModel = require("../model/User");

const newOrder = async (req, res) => {
  const {
    userId,
    order_id,
    product_id,
    date,
    customer_name,
    items,
    paid,
    status,
    spent,
  } = req.body;

  try {
    // Check if product_id is an array
    if (Array.isArray(product_id)) {
      // Option 1: Create a separate order for each product
      const orderPromises = product_id.map(async (pid) => {
        const newOrder = new Order({
          order_id: `${order_id}-${pid.substring(0, 4)}`, // Create unique order IDs
          user_id: userId,
          productId: pid, // Single product ID
          date,
          customer_name,
          items: 1, // Each order has 1 item
          paid,
          status,
          spent: spent / product_id.length, // Divide total spent
        });

        return newOrder.save();
      });

      const savedOrders = await Promise.all(orderPromises);

      // Update user's orders
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      savedOrders.forEach((order) => {
        user.orders.push({
          product: order._id,
          orderId: order._id,
          status: status || "pending",
          orderedAt: date || Date.now(),
        });
      });

      await user.save();

      res.status(201).json({
        message: "Orders placed successfully",
        orders: savedOrders,
      });
    }
    // Option 2: Use only the first product ID if it's an array
    else {
      const productIdToUse = Array.isArray(product_id)
        ? product_id[0]
        : product_id;

      const newOrder = new Order({
        order_id,
        user_id: userId,
        productId: productIdToUse,
        date,
        customer_name,
        items,
        paid,
        status,
        spent,
      });

      const savedOrder = await newOrder.save();

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.orders.push({
        product: savedOrder._id,
        orderId: savedOrder._id,
        status: status || "pending",
        orderedAt: date || Date.now(),
      });

      await user.save();

      res.status(201).json({
        message: "Order placed successfully",
        order: savedOrder,
      });
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

const getOrders = async (req, res) => {
  console.log("order running");
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ status: 0, msg: "User ID is required" });
    }

    // Find all orders for this user with populated product details
    const orders = await Order.find({ user_id: userId }).populate({
      path: "productId",
      model: "Product",
      select: "pname price images short_description category",
    });

    console.log("orders: ", orders);

    // Format the response
    const formattedOrders = orders.map((order) => ({
      orderId: order._id,
      order_id: order.order_id,
      date: order.date,
      status: order.status,
      paid: order.paid,
      product: order.productId
        ? {
            id: order.productId._id,
            name: order.productId.pname,
            price: order.productId.price,
            image:
              order.productId.images && order.productId.images.length > 0
                ? `/uploads/${order.productId.images[0]}`
                : null,
            description: order.productId.short_description,
            category: order.productId.category,
          }
        : null,
    }));

    res.status(200).json({ status: 1, orders: formattedOrders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ status: 0, msg: "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate input
    if (!orderId) {
      return res.status(400).json({
        status: 0,
        msg: "Order ID is required",
      });
    }

    if (!status) {
      return res.status(400).json({
        status: 0,
        msg: "New status is required",
      });
    }

    // Find and update the order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({
        status: 0,
        msg: "Order not found",
      });
    }

    // If the order has a user_id, update the order status in the user's orders array
    if (updatedOrder.user_id) {
      await UserModel.updateOne(
        {
          _id: updatedOrder.user_id,
          "orders.orderId": orderId,
        },
        {
          $set: { "orders.$.status": status },
        }
      );
    }

    res.status(200).json({
      status: 1,
      msg: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      status: 0,
      msg: "Internal server error",
    });
  }
};

module.exports = {
  newOrder,
  getOrders,
  getUserOrders,
  updateOrderStatus,
};
