import express from "express";
import { createCustomer, deleteCustomer, getAllCustomers, updateCustomer, getCustomer } from "../controllers/customercontroller.js";  
import User from "../models/usermodel.js"; // or "../models/User.js" if different
import multer from "multer";
import cloudinary from "../utils/cloudinaryUploader.js"; // optional, if you use Cloudinary


const router = express.Router();
// ✅ Multer setup
const storage = multer.memoryStorage(); // or diskStorage if not using cloudinary
const upload = multer({ storage });

router.post("/", createCustomer);
router.get("/", getAllCustomers);
router.put("/:id",upload.single("image"), updateCustomer);
router.delete("/:id", deleteCustomer);
router.get('/:id', getCustomer)
export default router;