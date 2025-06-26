import Feedback from '../models/Feedback.js';

// Add new feedback
exports.createFeedback = async (req, res) => {
  console.log("🔍 Received body:", req.body);
  try {
    console.log("REQ BODY:", req.body);
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error("SAVE ERROR:", error);
    res.status(500).json({ error: 'Error saving feedback' });
  }
};

// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching feedbacks' });
  }
};
