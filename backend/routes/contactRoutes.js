// routes/contactRoutes.js

import express from 'express';
import Contact from '../models/Contact.js';
import Notification from '../models/Notification.js'; // Assuming you have a Notification model
const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { username, email, message } = req.body;

    if (!username || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = new Contact({ username, email, message });
    await contact.save();
    // 🔔 Create admin-only notification
    await Notification.create({
      message: `📩 New contact message from ${username}`,
      target: "admin",
    });
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/contact
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
