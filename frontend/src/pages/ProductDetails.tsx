import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const avurudhuProducts = [
  { name: "New Year Ribbon Cake - Design 1", price: 2500, image: "https://www.divine.lk/cdn/shop/products/IMG-20210318-WA0011_1024x1024@2x.jpg?v=1617260440" },
  { name: "New Year Ribbon Cake - Design 2", price: 2400, image: "https://www.divine.lk/cdn/shop/products/IMG-20210318-WA0015_1024x1024@2x.jpg?v=1617260528" },
  { name: "New Year Ribbon Cake - Design 4", price: 4600, image: "https://www.divine.lk/cdn/shop/products/IMG-20210318-WA0014_1024x1024@2x.jpg?v=1617260732" },
  { name: "New Year Chocolate Cake", price: 4800, image: "https://www.divine.lk/cdn/shop/products/IMG-20210318-WA0016_540x.jpg?v=1617261101" },
  { name: "Bulath Kole, Puhuna and Rice Paddy", price: 4600, image: "https://www.divine.lk/cdn/shop/products/1kgBulathkole_pahanaandricepaddyRs4200_540x.jpg?v=1678179278" },
  { name: "New Year Ribbon Cake - Design 6", price: 5500, image: "https://www.divine.lk/cdn/shop/products/IMG-20210412-WA0014_540x.jpg?v=1618228928" },
  { name: "Bulath Leaf Ribbon Cake", price: 2900, image: "https://www.divine.lk/cdn/shop/products/750grbulathkoleribboncakeRs2900_540x.jpg?v=1678787403" },
  { name: "New Year Ribbon Cake - Design 3", price: 4800, image: "https://www.divine.lk/cdn/shop/products/IMG-20210318-WA0010_540x.jpg?v=1617260814" },
  { name: "New Year Ribbon Cake - Design 5", price: 4800, image: "https://www.divine.lk/cdn/shop/products/8_63fcf8dc-6bb6-46d4-9f0c-93773b5222be_540x.jpg?v=1576989480" },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = avurudhuProducts[id];

  if (!product) return <div className="text-center p-8">Product not found!</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-rose-600 font-semibold hover:underline"
      >
        &larr; Back
      </button>

      <h1 className="text-3xl font-bold mb-4 text-rose-700">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-96 rounded-lg mb-6 mx-auto" />
      <p className="text-xl font-semibold mb-6 text-rose-600">Price: Rs. {product.price.toLocaleString()}</p>

      {/* Add checkout or other info here */}
      <button className="bg-rose-600 text-white px-8 py-3 rounded hover:bg-rose-700 transition block mx-auto font-semibold">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default ProductDetails;
