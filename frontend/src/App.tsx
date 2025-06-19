// src/App.js or src/routes/AppRoutes.js
// import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
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

import FeedbackList from './pages/FeedbackList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/feedback-list" element={<FeedbackList />} /> {/* Admin/User page */}
      <Route path="/product/:name" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
