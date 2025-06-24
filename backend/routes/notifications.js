// routes/notifications.js
import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// ✅ Get all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(10);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

export default router;
