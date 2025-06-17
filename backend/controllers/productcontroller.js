import mongoose from "mongoose";
import Product from "../models/productmodel.js";

export const createProduct = async(req,res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image || !product.description){
        return res.status(400).json({message: "All fields are required"});
    }

    const newProduct = new Product(product)
    try{
        await newProduct.save()
        res.status(201).json({sucess:"true",message: "product is added"});
    }catch(error){
        res.status(409).json({sucess:"false",message: "product is not added"});
        console.log(error);    
    }
    
};

export const deleteProduct = async(req,res) => {
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({sucess:"true",message: "product is deleted"});
    }catch(error){
        res.status(409).json({sucess:"false",message: "product is not deleted"});
        console.log(error);
    }
};

export const getProducts = async(req,res) => {
    try{
        const products = await Product.find();
        res.status(200).json({sucess:"true",message: "products are found"});
    }catch(error){
        res.status(409).json({sucess:"false",message: "products are not found"});
        console.log(error);
    }
};

export const updateProduct = async(req,res) => {
    const{id} = req.params;
    const product = req.body;

    if(!mongoose.isValidObjectId(id)){
        res.status(400).json({sucess:"false",message: "id is not valid"});
    }

    try{
        await Product.findByIdAndUpdate(id,product);
        res.status(200).json({sucess:"true",message: "product is updated"});
    }catch(error){
        res.status(409).json({sucess:"false",message: "product is not updated"});
        console.log(error);
    }
}