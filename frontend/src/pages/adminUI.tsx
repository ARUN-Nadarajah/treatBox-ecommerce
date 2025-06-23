import Sidebar from "../components/adminSidebar";
import Header from "../components/header";
import DashboardCards from "../components/dashboardCards";
import ProductTable from "../components/productTable";
import ContactTable from "../components/ContactTable";
import NavBar from "../components/NavBar";

export default function AdminDashboard() {
  return (
    <>
      <NavBar />
      <div
        className="flex min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/pink-cake-slice-with-floral-decoration-generative-ai_188544-12187.jpg')",
        }}
      >
        {/* Sidebar */}
        <div className="bg-white/70 backdrop-blur-lg shadow-xl">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid gap-6">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-md border border-rose-100">
              <Header />
            </div>

            {/* Dashboard Cards */}
            <div className="bg-gradient-to-br from-white via-rose-50 to-pink-100 rounded-3xl p-6 shadow-lg border border-pink-200">
              <DashboardCards />
            </div>

            {/* Products */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-rose-200">
              <h2 className="text-2xl font-bold text-rose-700 mb-4">🍰 Products Overview</h2>
              <ProductTable />
            </div>

            {/* Contact Messages */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-pink-300">
              <h2 className="text-2xl font-bold text-pink-700 mb-4">📨 Recent Contact Messages</h2>
              <ContactTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
