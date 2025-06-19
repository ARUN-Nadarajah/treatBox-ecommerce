import express from "express";
import { createCustomer, deleteCustomer, getAllCustomers, updateCustomer, getCustomer } from "../controllers/customercontroller.js";     

const router = express.Router();

router.post("/", createCustomer);
router.get("/", getAllCustomers);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
router.get('/:id', getCustomer)
export default router;