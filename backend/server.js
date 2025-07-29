// backend/server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import connectDB from "./config/db.js";
import ProductRouter from "./routes/productroute.js";
import AuthRouter from "./routes/authroutes.js";
import UserRouter from "./routes/customerroutes.js";
import FeedbackRouter from "./routes/feedbackRoutes.js";
import ContactRouter from "./routes/contactRoutes.js"; // ✅ Correct ES Module import
import notificationRoutes from "./routes/notificationRoutes.js"; // ✅ Import notification routes
import multer from 'multer';

dotenv.config();

const app = express();
const storage = multer.memoryStorage(); // or configure disk storage
const upload = multer({ storage });


app.use(cors({
  origin: "http://localhost:5174",
  credentials: true
}));

// Before (default size limit is small)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ After — increased limit to 10MB
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// app.use(cors());


// Mount all routers
app.use("/api/products", ProductRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/feedback", FeedbackRouter);
app.use("/api/contact", ContactRouter); // ✅ Only once
app.use("/api/notifications", notificationRoutes); // ✅ Use notifications routes

// Start server
app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
