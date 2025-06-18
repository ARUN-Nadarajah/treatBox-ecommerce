// src/App.js or src/routes/AppRoutes.js
// import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import About from './pages/About'; // adjust path as needed
import Feedback from './pages/Feedback';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  );
}

export default App;
