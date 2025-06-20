// routes/contactRoutes.js

import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

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
