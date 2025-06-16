export default function ProductTable() {
  const products = [
    { name: "Chocolate Box", stock: 20, price: "$25" },
    { name: "Candy Jar", stock: 10, price: "$15" },
    { name: "Gift Hamper", stock: 5, price: "$40" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-pink-700">Product Overview</h2>
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-pink-50 text-pink-800">
          <tr>
            <th className="py-3 px-2 text-left">Product</th>
            <th className="px-2">Stock</th>
            <th className="px-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i} className="hover:bg-pink-50 transition">
              <td className="py-2 px-2">{p.name}</td>
              <td className="px-2 text-center">{p.stock}</td>
              <td className="px-2 text-center">{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}