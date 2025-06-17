import express from "express";
import { createProduct, deleteProduct , getProducts, updateProduct} from "../controllers/productcontroller.js";

const router = express.Router();

router.post("/create", createProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", getProducts);
router.put("/update/:id", updateProduct);

export default router;  