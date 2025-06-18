import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import About from './pages/About'; 
import Feedback from './pages/Feedback';
import AdminDashboard from './pages/adminUI';
import { Routes, Route } from 'react-router-dom';
import './App.css';
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
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
