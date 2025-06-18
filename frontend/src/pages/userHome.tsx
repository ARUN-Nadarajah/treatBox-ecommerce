import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../APIs/productApi";
import type { Product } from "../APIs/productApi";
import NavBar from "../components/NavBar";

export default function UserHomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchProducts()
      .then((res) => {
        if (res.data && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("Unexpected response:", res.data);
        }
      })
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const groupedProducts = filteredProducts.reduce((groups: Record<string, Product[]>, product) => {
    const category = product.category || "Uncategorized";
    if (!groups[category]) groups[category] = [];
    groups[category].push(product);
    return groups;
  }, {});

  return (
    <div className="font-sans text-gray-800">
      
      <NavBar />

      {/* Hero Banner */}
      <section
        className="relative h-screen flex items-center justify-center text-center px-6 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1470&q=80')`,
        }}
      >
        <div className="bg-rose-900 bg-opacity-50 p-8 rounded-lg max-w-lg text-white">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Freshly Baked <br /> Treats Just For You
          </h1>
          <p className="mb-8 text-lg font-light drop-shadow">
            Discover the taste of home with our delicious bakery delights.
          </p>
          <a
            href="/product"
            className="inline-block bg-rose-500 hover:bg-rose-600 px-8 py-3 rounded-full font-semibold shadow-lg transition"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 rounded px-4 py-2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="">All Categories</option>
          {[...new Set(products.map(p => p.category))].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Product Sections */}
      <div className="mt-10">
        {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <section
            key={category}
            className={`py-16 px-6 ${category === "Classic Cakes" ? "bg-gray-50" : ""}`}
          >
            <h2 className="text-4xl font-extrabold text-center mb-12 text-rose-700">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
              {categoryProducts.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id} className="w-full max-w-xs">
                  <div
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer flex flex-col items-center p-6"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-1/ object-contain rounded-md mb-4"
                    />
                    <h3 className="text-lg font-semibold text-center mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 text-center">Available stock:{product.stock}</p>
                    <p className="text-rose-600 font-bold text-lg">Rs. {product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-rose-100 text-rose-800 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          © 2025 TreatBox. All rights reserved. | Designed by You
        </div>
      </footer>
    </div>
  );
}