import express from 'express';
import Feedback from '../models/Feedback.js';
const router = express.Router();


// POST /api/feedback
// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, feedback, rating } = req.body;

    if (!name || !email || !phone || !feedback || rating === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newFeedback = new Feedback({ name, email, phone, feedback, rating });
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error("Error saving feedback:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/feedback/:productId
router.get('/feedback/:productId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ productId: req.params.productId });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
