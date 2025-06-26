import Usermodel from "../models/usermodel.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";


export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Usermodel.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCustomer = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, message: "Invalid customer ID" });
    }
    try {
        const customer = await Usermodel.findById(id);
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to get customer" });
    }
};

export const deleteCustomer = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, message: "Invalid customer ID" });
    }
    try {
        const deleted = await Usermodel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        res.status(200).json({ success: true, message: "Customer is deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete customer" });
    }
};

// ✅ UPDATE CUSTOMER
export const updateCustomer = async (req, res) => {
  try {
    console.log("✅ Update hit");
    console.log("Body:", req.body);
    console.log("File:", req.file);
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const updates = { ...req.body };

    // Hash password if included
    if (updates.password) {
      const saltRounds = 10;
      updates.password = await bcrypt.hash(updates.password, saltRounds);
    }

    // Image upload path
    if (req.file && req.file.path) {
      updates.image = req.file.path;
    }

    const updated = await Usermodel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (req.file) {
  const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
  updates.image = base64Image;
}


    res.status(200).json({ success: true, message: "Updated", customer: updated });
  } catch (error) {
    console.error("❌ Update failed:", error.message);
    console.error("🔴 Full error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};


export const createCustomer = async (req, res) => {
    const customer = req.body;
    try {
        // Hash the password before saving
        if (customer.password) {
            const saltRounds = 10;
            customer.password = await bcrypt.hash(customer.password, saltRounds);
        }
        const newCustomer = new Usermodel(customer);
        await newCustomer.save();
        res.status(201).json({ success: true, message: "Customer is added", customer: newCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to add customer" });
    }
};

