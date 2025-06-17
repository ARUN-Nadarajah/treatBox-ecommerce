import mongoose from "mongoose";
import Product from "../models/productmodel.js";

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image || !product.description) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).json({ success: true, message: "Product is added", product: newProduct });
  } catch (error) {
    console.log(error);
    res.status(409).json({ success: false, message: "Product is not added" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product is deleted" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ success: false, message: "Product is not deleted" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(409).json({ success: false, message: "Products are not found" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    await Product.findByIdAndUpdate(id, product, { runValidators: true });
    res.status(200).json({ success: true, message: "Product is updated" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ success: false, message: "Product is not updated" });
  }
};