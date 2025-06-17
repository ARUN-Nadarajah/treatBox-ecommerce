import Sidebar from "../components/adminSidebar";
import Header from "../components/header";
import DashboardCards from "../components/dashboardCards";
import ProductTable from "../components/productTable";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <DashboardCards />
        <ProductTable />
      </div>
    </div>
  );
}