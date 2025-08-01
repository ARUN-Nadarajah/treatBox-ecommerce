// models/Contact.js

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact; // ✅ ES Module export
