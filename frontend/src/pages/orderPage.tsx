import React, { useState, useEffect, type ChangeEvent } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Define the expected product type
interface Product {
  _id: string;
  name: string;
  image: string;
  weight: number;
  price: number;
}

interface LocationState {
  product?: Product;
}

const OrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [weight, setWeight] = useState<number>(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const state = location.state as LocationState;

    if (state?.product) {
      setProduct(state.product);
      setWeight(state.product.weight);
    } else if (id) {
      axios
        .get<Product>(`http://localhost:5000/api/products/${id}`)
        .then((res) => {
          setProduct(res.data);
          setWeight(res.data.weight);
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id, location]);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
  };

  const calculatePrice = () => {
    if (!product) return "0.00";
    const pricePerGram = product.price / product.weight;
    return (pricePerGram * weight * quantity).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    if (!product || !userId) {
      alert("Missing product or user information");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/orders", {
        userId,
        productId: product._id,
        productName: product.name,
        quantity,
        weight,
        totalPrice: parseFloat(calculatePrice()),
      });

      alert("✅ Order placed successfully!");
      navigate("/"); // redirect to homepage or success page
    } catch (error) {
      console.error("Error placing order:", error);
      alert("❌ Failed to place order. Please try again.");
    }
  };

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Order: {product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover rounded mb-4"
      />

      <label className="block mb-2 text-gray-700">Select Quantity:</label>
      <input
        type="number"
        value={quantity}
        min={1}
        onChange={handleQuantityChange}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 text-gray-700">Select Weight (in grams):</label>
      <input
        type="number"
        value={weight}
        min={100}
        step={100}
        onChange={handleWeightChange}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="text-lg font-semibold text-green-700 mb-4">
        Total Price: Rs. {calculatePrice()}
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  );
};

const Order = OrderPage;
export default Order;

