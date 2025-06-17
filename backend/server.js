import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import ProductRouter from "./routes/productroute.js";

dotenv.config(); 

const app = express();
app.use(express.json());

app.use("/api/products", ProductRouter);


app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});