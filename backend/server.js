import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import connectDB from "./config/db.js";
import ProductRouter from "./routes/productroute.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // your Vite dev server origin
  credentials: true
}));

app.use(express.json());

app.use("/api/products", ProductRouter);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});