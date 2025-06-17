import  { useEffect, useState } from "react";
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
  });

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Product>>({});

  useEffect(() => {
    fetchProducts()
      .then((res) => {
        if (res.data && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("Expected array inside res.data.products, got:", res.data);
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
        prev.map((p) => (p._id === editingProductId ? { ...p, ...editValues } : p))
      );
      setEditingProductId(null);
      setEditValues({});
    } catch (err) {
      console.error("Failed to update", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Product Manager</h2>

      {/* Add Product Form */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {["name", "price", "stock", "image", "description"].map((field) => (
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

      {/* Product List */}
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product._id}
            className="border p-4 rounded shadow-sm flex flex-col gap-2"
          >
            {editingProductId === product._id ? (
              <div className="grid grid-cols-2 gap-2">
                {["name", "price", "stock", "image", "description"].map((field) => (
                  <input
                    key={field}
                    className="border p-2"
                    placeholder={field}
                    value={(editValues as any)[field] || ""}
                    onChange={(e) =>
                      setEditValues({ ...editValues, [field]: e.target.value })
                    }
                    type={field === "price" || field === "stock" ? "number" : "text"}
                  />
                ))}
                <button
                  onClick={saveEdit}
                  className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <p><strong>Name:</strong> {product.name}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <img src={product.image} alt={product.name} className="h-32 w-32 object-cover rounded" />
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
          </li>
        ))}
      </ul>
    </div>
  );
}