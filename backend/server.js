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

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// Mount all routers
app.use("/api/products", ProductRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/feedback", FeedbackRouter);
app.use("/api/contact", ContactRouter); // ✅ Only once

// Start server
app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
