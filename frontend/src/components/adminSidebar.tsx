import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-pink-200 via-rose-100 to-orange-100 shadow-md">
      <div className="p-6 text-2xl font-bold text-pink-800">TreatBox 🍬</div>
      <ul className="space-y-4 p-4 text-pink-900 font-medium">
        <Link to="/admin">
        <li className="hover:text-white hover:bg-pink-400 p-2 rounded-lg cursor-pointer">
          🏠 Dashboard
        </li>
        </Link>
        <li className="hover:text-white hover:bg-pink-400 p-2 rounded-lg cursor-pointer">
          📦 Orders
        </li>
        <Link to="/admin/feedbacks">
        <li className="hover:text-white hover:bg-pink-400 p-2 rounded-lg cursor-pointer">
          📝 feedbacks
        </li>
        </Link>

       <Link to="/admin/contacts">
  <li className="hover:text-white hover:bg-pink-400 p-2 rounded-lg cursor-pointer">
    📬 Contact Messages
  </li>
</Link>



        <Link to="/admin/customers">
          <li className="hover:text-white hover:bg-pink-400 p-2 rounded-lg cursor-pointer">
            👥 Customers
          </li>
        </Link>
        <Link to="/logout">
          <li className="hover:text-white hover:bg-pink-400 p-2 rounded-lg cursor-pointer mt-10">
            🚪 Logout
          </li>
        </Link>
      </ul>
    </div>
  );
}
