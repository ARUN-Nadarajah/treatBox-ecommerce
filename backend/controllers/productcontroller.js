import mongoose from "mongoose";
import Product from "../models/productmodel.js";

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image || !product.description || !product.stock || !product.category) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).json({ success: true, message: "Product is added", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product is deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete product" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, message: "Products found", products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to get products" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  try {
    const updated = await Product.findByIdAndUpdate(id, product, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product is updated", product: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update product" });
  }
};

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ product });
};
