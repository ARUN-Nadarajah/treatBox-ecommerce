import ProductFeedback from "../models/productFeedbackModel.js";

// POST /api/product-feedback
export const createFeedback = async (req, res) => {
  const { productId, message } = req.body;

  if (!productId || !message) {
    return res.status(400).json({ error: "Missing productId or message" });
  }

  try {
    const feedback = new ProductFeedback({ productId, message });
    await feedback.save();
    res.status(201).json({ success: true, feedback });
  } catch (err) {
    console.error("Create feedback error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/product-feedback/product/:productId
export const getFeedbacksByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const feedbacks = await ProductFeedback.find({ productId }).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error("Fetch feedbacks error:", err);
    res.status(500).json({ error: "Failed to fetch feedbacks" });
  }
};
