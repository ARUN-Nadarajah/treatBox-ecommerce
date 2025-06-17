import { Home, Package, Users, LogOut, ShoppingCart } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-pink-200 via-rose-100 to-orange-100 shadow-md">
      <div className="p-6 text-2xl font-bold text-pink-800">TreatBox 🍬</div>
      <ul className="space-y-4 p-4 text-pink-900 font-medium">
        <li className="hover:text-white hover:bg-pink-400 p-2 rounded-lg cursor-pointer">🏠 Dashboard</li>
        <li className="hover:text-white hover:bg-pink-400 p-2 rounded-lg cursor-pointer">📦 Orders</li>
        <li className="hover:text-white hover:bg-pink-400 p-2 rounded-lg cursor-pointer">🎁 Products</li>
        <li className="hover:text-white hover:bg-pink-400 p-2 rounded-lg cursor-pointer">👥 Customers</li>
        <li className="hover:text-white hover:bg-pink-400 p-2 rounded-lg cursor-pointer mt-10">🚪 Logout</li>
      </ul>
    </div>
  );
}