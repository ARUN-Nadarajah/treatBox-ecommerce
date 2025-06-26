import express from 'express';
import Feedback from '../models/Feedback.js';
import Notification from '../models/Notification.js';
const router = express.Router();


// POST /api/feedback
// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    console.log('BODY RECEIVED:', req.body);
    const { username, email, phone, feedback, rating } = req.body;

    if (!username  || !email || !phone || !feedback || rating === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newFeedback = new Feedback({ username, email, phone, feedback, rating });
    await newFeedback.save();

        // 🔔 Create admin-only notification
    await Notification.create({
      message: `📢 New feedback from ${username}`,
      target: "admin",
    });

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
