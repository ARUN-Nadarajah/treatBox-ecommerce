import { Routes, Route } from 'react-router-dom';
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
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './components/privateroute';
import Logout from './pages/logout';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected Routes */}
        <Route path="/home" element={
          <PrivateRoute><UserHomePage /></PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>
        } />
        <Route path="/product/:id" element={
          <PrivateRoute><ProductDetails /></PrivateRoute>
        } />
        <Route path="/contact" element={
          <PrivateRoute><Contact /></PrivateRoute>
        } />
        <Route path="/about" element={
          <PrivateRoute><About /></PrivateRoute>
        } />
        <Route path="/feedback" element={
          <PrivateRoute><Feedback /></PrivateRoute>
        } />
      </Routes>
    </>
  );
}

export default App;