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

  // 🔧 NEW: Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Product Manager</h2>

      {/* Add Product Form */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {["name", "price", "stock", "image", "description", "category"].map((field) => (
          <input
            key={field}
            className="border p-2"
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={(newProduct as any)[field]}
            onChange={(e) =>
              setNewProduct({ ...newProduct, [field]: e.target.value })
            }
            type={field === "price" || field === "stock" ? "number" : "text"}
          />
        ))}
        <button
          onClick={handleAddProduct}
          className="col-span-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </div>

      {/* 🆕 Grouped Product List by Category */}
      <div className="space-y-10">
        {Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold mb-4">{category}</h3> {/* 🔧 Category Title */}
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
                      <p>
                        <strong>Description:</strong> {product.description}
                      </p>
                      <p>
                        <strong>Category:</strong> {product.category}
                      </p> {/* 🔧 Un-commented Category */}
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