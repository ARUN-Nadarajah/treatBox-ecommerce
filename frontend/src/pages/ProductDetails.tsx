import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Product } from "../APIs/productApi";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get<{ product: Product }>(`http://localhost:5001/api/products/${id}`)
        .then((res) => {
          setProduct(res.data.product);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!product) return <div className="p-8 text-center text-red-600">Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-gray-800">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-contain p-6"
        />
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-rose-700 mb-4">{product.name}</h2>
          <p className="text-lg text-gray-700 mb-6">
            Category: <span className="font-medium">{product.category}</span>
          </p>
          <p className="text-rose-600 text-2xl font-bold mb-4">
            Rs. {product.price.toLocaleString()}
          </p>
          <p className="text-gray-600 mb-4">Stock: {product.stock}</p>
          <p className="text-gray-600 mb-4">Description: {product.description}</p>
          <p className="text-gray-600 leading-relaxed">
            {/* Replace this with actual description if available */}
            Experience the rich flavor and soft texture of our freshly baked {product.name}. Perfect for every celebration!
          </p>
        </div>
      </div>
    </div>
  );
}