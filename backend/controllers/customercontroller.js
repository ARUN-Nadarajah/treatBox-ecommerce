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

export const updateCustomer = async (req, res) => {
    const id = req.params.id;
    const customer = req.body;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, message: "Invalid customer ID" });
    }
    try {
        // Hash the password if it is being updated
        if (customer.password) {
            const saltRounds = 10;
            customer.password = await bcrypt.hash(customer.password, saltRounds);
        }
        const updated = await Usermodel.findByIdAndUpdate(id, customer, { new: true, runValidators: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        res.status(200).json({ success: true, message: "Customer is updated", customer: updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update customer" });
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

