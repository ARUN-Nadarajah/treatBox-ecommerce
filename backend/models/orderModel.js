import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  weight: { type: Number, required: true }, // in grams
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;

