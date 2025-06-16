import { Home, Package, Users, LogOut, ShoppingCart } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r shadow-sm">
      <div className="p-6 text-xl font-bold text-pink-500">TreatBox Admin</div>
      <ul className="space-y-2 p-4 text-gray-700">
        <li className="flex items-center space-x-2 hover:text-pink-500 cursor-pointer">
          <Home size={18} /> <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-pink-500 cursor-pointer">
          <ShoppingCart size={18} /> <span>Orders</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-pink-500 cursor-pointer">
          <Package size={18} /> <span>Products</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-pink-500 cursor-pointer">
          <Users size={18} /> <span>Customers</span>
        </li>
        <li className="flex items-center space-x-2 hover:text-pink-500 cursor-pointer mt-10">
          <LogOut size={18} /> <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}