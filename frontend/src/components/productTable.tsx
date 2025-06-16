export default function ProductTable() {
  const products = [
    { name: "Chocolate Box", stock: 20, price: "$25" },
    { name: "Candy Jar", stock: 10, price: "$15" },
    { name: "Gift Hamper", stock: 5, price: "$40" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Product Overview</h2>
      <table className="w-full text-left text-sm">
        <thead className="border-b text-gray-600">
          <tr>
            <th className="py-2">Product</th>
            <th>Stock</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {products.map((product, idx) => (
            <tr key={idx} className="border-b last:border-none">
              <td className="py-2">{product.name}</td>
              <td>{product.stock}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}