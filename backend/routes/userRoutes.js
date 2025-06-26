const express = require('express');
const router = express.Router();
const User = require('../models/User');
const cloudinary = require("../utils/cloudinaryUploader");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { storage } = require("../utils/cloudinary"); // ✅ Cloudinary + Multer setup

// 🔍 Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 🛠️ Update user by ID (with optional image upload)
router.put("/:id", upload.single("image"),updateCustomer, async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file && req.file.path) {
      updates.image = req.file.path; // ✅ Auto-uploaded to Cloudinary
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, customer: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

module.exports = router;