import mongoose from "mongoose";

const productFeedbackSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductFeedback = mongoose.model("ProductFeedback", productFeedbackSchema);

export default ProductFeedback;
