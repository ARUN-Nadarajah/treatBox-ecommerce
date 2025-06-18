import { Routes, Route, Navigate } from 'react-router-dom';  // Add Navigate import
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import About from './pages/About'; 
import Feedback from './pages/Feedback';
import AdminDashboard from './pages/adminUI';
import './App.css';
import UserHomePage from './pages/userHome';
import Login from './pages/login';
import Register from './pages/register';
import { ToastContainer } from "react-toastify";
import AuthGuard from './components/authGuard';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/home" element={<AuthGuard><UserHomePage /></AuthGuard>} />
        <Route path="/admin" element={<AuthGuard requireAdmin><AdminDashboard /></AuthGuard>} />
      </Routes>
    </>
  );
}

export default App;