import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import type { Product } from "../APIs/productApi";

interface Feedback {
  _id: string;
  message: string;
  createdAt: string;
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedbackInput, setFeedbackInput] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (id) {
      // Fetch product
      axios
        .get<{ product: Product }>(`http://localhost:5001/api/products/${id}`)
        .then((res) => {
          setProduct(res.data.product);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setLoading(false);
        });

      // Fetch feedbacks
      axios
        .get<Feedback[]>(`http://localhost:5001/api/feedback/product/${id}`)
        .then((res) => setFeedbacks(res.data))
        .catch((err) => console.error("Error fetching feedbacks:", err));
    }
  }, [id]);

  const handleOrderClick = () => {
    if (product && userId) {
      navigate(`/order/${product._id}`, { state: { product, userId } });
    }
  };

  const handleAddToCart = async () => {
    if (!userId || !product) return;

    try {
      await axios.post("http://localhost:5001/api/cart/add", {
        userId,
        productId: product._id,
        quantity: 1,
      });
      alert("🛒 Added to cart!");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("❌ Failed to add to cart");
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackInput.trim()) return;

    try {
      await axios.post("http://localhost:5001/api/feedback", {
        productId: id,
        message: feedbackInput.trim(),
      });
      setFeedbackInput("");

      // Reload feedbacks
      const res = await axios.get<Feedback[]>(`http://localhost:5001/api/feedback/product/${id}`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Feedback submit error:", err);
      alert("Error submitting feedback.");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!product) return <div className="p-8 text-center text-red-600">Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-gray-800">
      {/* Product Card */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-contain p-6"
        />
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
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
              Experience the rich flavor and soft texture of our freshly baked {product.name}.
              Perfect for every celebration!
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleOrderClick}
              className="w-1/2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow"
            >
              Order Now
            </button>
            <button
              onClick={handleAddToCart}
              className="w-1/2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="mt-10 space-y-6">
        {/* Feedback List */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Customer Feedback</h3>
          {feedbacks.length === 0 ? (
            <p className="text-gray-500 italic">No feedback yet. Be the first to leave one!</p>
          ) : (
            <ul className="space-y-4">
              {feedbacks.map((fb) => (
                <li key={fb._id} className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-sm">
                  <p>{fb.message}</p>
                  <p className="text-xs text-gray-400 mt-1 italic">
                    {new Date(fb.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Feedback */}
        <form onSubmit={handleSubmitFeedback} className="bg-white p-6 rounded-xl shadow space-y-4">
          <h4 className="text-lg font-semibold">Leave Feedback</h4>
          <textarea
            value={feedbackInput}
            onChange={(e) => setFeedbackInput(e.target.value)}
            rows={4}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write your feedback..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
