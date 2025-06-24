// models/Notification.js
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
   productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // ✅
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", NotificationSchema);
