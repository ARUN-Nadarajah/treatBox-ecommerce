import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import { getOrdersByUserId } from "../controllers/orderController.js";
const router = express.Router();

// POST /api/orders
router.post("/", placeOrder);

router.get("/user/:userId", getOrdersByUserId);

export default router;
