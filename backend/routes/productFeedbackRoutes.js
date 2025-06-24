import express from "express";
import {createFeedback,getFeedbacksByProduct } from "../controllers/productFeedbackController.js"
const router = express.Router();

router.post("/", createFeedback);
router.get("/product/:productId", getFeedbacksByProduct);

export default router;
