import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import About from './pages/About'; 
import Feedback from './pages/Feedback';
import AdminDashboard from './pages/adminUI';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import UserHomePage from './pages/userHome';
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<UserHomePage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
    </>
  );
}

export default App;
