import express from "express";
import { createProduct, deleteProduct , getAllProducts, updateProduct , getProduct} from "../controllers/productcontroller.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get('/:id', getProduct)
export default router;  