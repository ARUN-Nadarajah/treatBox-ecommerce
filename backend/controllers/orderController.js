import Order from "../models/orderModel.js";

 export const placeOrder = async (req, res) => {
  try {
    const { productId, productName, quantity, weight, totalPrice } = req.body;

    if (!productId || !productName || !quantity || !weight || !totalPrice) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const order = new Order({
      productId,
      productName,
      quantity,
      weight,
      totalPrice,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Server error" });
  }
};



export const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("products.productId");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


