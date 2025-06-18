import { useEffect, useState } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../APIs/productApi";
import type { Product } from "../APIs/productApi";

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
    description: "",
    category: "",
  });

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Product>>({});

  const [searchQuery, setSearchQuery] = useState(""); // 🔍 search
  const [selectedCategory, setSelectedCategory] = useState(""); // 🔎 category filter
  const [priceRange, setPriceRange] = useState(""); // 💵 price filter

  useEffect(() => {
    fetchProducts()
      .then((res) => {
        if (res.data && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error(
            "Expected array inside res.data.products, got:",
            res.data
          );
        }
      })
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const handleAddProduct = async () => {
    try {
      const payload = {
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        image: newProduct.image,
        description: newProduct.description,
        category: newProduct.category,
      };

      const res = await createProduct(payload);
      if (res.data && res.data.product) {
        setProducts((p) => [...p, res.data.product]);
      }
      setNewProduct({
        name: "",
        price: "",
        stock: "",
        image: "",
        description: "",
        category: "",
      });
    } catch (err) {
      console.error("Failed to create product", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const startEditing = (product: Product) => {
    setEditingProductId(product._id);
    setEditValues({ ...product });
  };

  const saveEdit = async () => {
    try {
      if (!editingProductId) return;
      await updateProduct(editingProductId, editValues);
      setProducts((prev) =>
        prev.map((p) =>
          p._id === editingProductId ? { ...p, ...editValues } : p
        )
      );
      setEditingProductId(null);
      setEditValues({});
    } catch (err) {
      console.error("Failed to update", err);
    }
  };

  // 🔧 Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // 🔍 Apply filters
  const filteredProducts = Object.entries(groupedProducts).reduce(
    (acc, [category, items]) => {
      const filtered = items.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          !selectedCategory || product.category === selectedCategory;
        const matchesPrice = (() => {
          if (!priceRange) return true;
          const price = product.price;
          if (priceRange === "0-1999") return price < 2000;
          if (priceRange === "2000-2999") return price >= 2000 && price < 3000;
          if (priceRange === "3000-4999") return price >= 3000 && price < 5000;
          if (priceRange === "5000+") return price >= 5000;
          return true;
        })();
        return matchesSearch && matchesCategory && matchesPrice;
      });
      if (filtered.length > 0) acc[category] = filtered;
      return acc;
    },
    {} as Record<string, Product[]>
  );

  const uniqueCategories = [
    ...new Set(products.map((p) => p.category || "Uncategorized")),
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Product Manager</h2>

      {/* 🔹 ADD PRODUCT SECTION */}
      <div className="mb-8 p-4 border rounded-lg bg-gray-50 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">➕ Add New Product</h3>
        <div className="grid grid-cols-2 gap-4">
          {["name", "price", "stock", "image", "description", "category"].map(
            (field) => (
              <input
                key={field}
                className="border p-2 rounded"
                placeholder={field[0].toUpperCase() + field.slice(1)}
                value={(newProduct as any)[field]}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, [field]: e.target.value })
                }
                type={field === "price" || field === "stock" ? "number" : "text"}
              />
            )
          )}
          <button
            onClick={handleAddProduct}
            className="col-span-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* 🔍 FILTER & SEARCH SECTION */}
      <div className="mb-10 p-4 border rounded-lg bg-blue-50 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">🔎 Filter & Search</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Prices</option>
            <option value="0-1999">Under 2000</option>
            <option value="2000-2999">2000 - 2999</option>
            <option value="3000-4999">3000 - 4999</option>
            <option value="5000+">5000+</option>
          </select>
        </div>
      </div>

      {/* 🆕 Grouped Product List by Category */}
      <div className="space-y-10">
        {Object.entries(filteredProducts).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((product) => (
                <div
                  key={product._id}
                  className="border p-4 rounded shadow-sm flex flex-col gap-2 bg-white hover:shadow-lg hover:scale-[1.02] transition duration-300"
                >
                  {editingProductId === product._id ? (
                    <div className="grid grid-cols-1 gap-2">
                      {["name", "price", "stock", "image", "description", "category"].map(
                        (field) => (
                          <input
                            key={field}
                            className="border p-2 rounded"
                            placeholder={field}
                            value={(editValues as any)[field] || ""}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                [field]: e.target.value,
                              })
                            }
                            type={
                              field === "price" || field === "stock"
                                ? "number"
                                : "text"
                            }
                          />
                        )
                      )}
                      <button
                        onClick={saveEdit}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <p>
                        <strong>Name:</strong> {product.name}
                      </p>
                      <p>
                        <strong>Price:</strong> ${product.price}
                      </p>
                      <p>
                        <strong>Stock:</strong> {product.stock}
                      </p>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-32 w-full object-cover rounded hover:opacity-90 hover:scale-105 transition duration-300"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => startEditing(product)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}