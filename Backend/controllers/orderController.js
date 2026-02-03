import Order from "../models/Order.js";

/* GET logged-in user's orders */
export const getMyOrders = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const orders = await Order.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    const now = new Date();

    for (let order of orders) {
      if (
        order.deliveryDate &&
        now > order.deliveryDate &&
        order.status !== "Delivered"
      ) {
        order.status = "Delivered";
        await order.save();
      }
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("GET MY ORDERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/* CREATE ORDER */
export const createOrder = async (req, res) => {
  try {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    const order = new Order({
      userId: req.userId,
      orderId,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      deliveryDate,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order" });
  }
};

/* CANCEL ORDER */
export const cancelOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.userId.toString() !== req.userId) {
    return res.status(401).json({ message: "Not authorized" });
  }

  if (order.status === "Delivered") {
    return res
      .status(400)
      .json({ message: "Delivered order cannot be cancelled" });
  }

  order.status = "Cancelled";
  await order.save();

  res.json({ message: "Order cancelled successfully" });
};

/* DELETE ORDER */
export const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.userId.toString() !== req.userId) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await order.deleteOne();
  res.json({ message: "Order deleted successfully" });
};
