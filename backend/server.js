import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import connectDB from "./config/db.js";
import ProductRouter from "./routes/productroute.js";
import AuthRouter from "./routes/authroutes.js";
import UserRouter from "./routes/customerroutes.js";
import FeedbackRouter from "./routes/feedbackRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // your Vite dev server origin
  credentials: true
}));

app.use(express.json());

app.use("/api/products", ProductRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/feedback", FeedbackRouter);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});