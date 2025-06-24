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
import CustomerManager from './pages/customermanager';
import FeedbackAdmin from './pages/FeedbackList';
import AdminContactList from './pages/AdminContactList';
import Profile from './pages/Profile';
import EditProfile from "./pages/EditProfile";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import Order from "./pages/orderPage";
import OrderPage from './pages/orderPage';


function App() {
  return (
    <>
      <ToastContainer aria-label="Notification Area" />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <PrivateRoute><UserHomePage /></PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>
        } />
        <Route path="/admin/customers" element={
          <PrivateRoute adminOnly={true}><CustomerManager /></PrivateRoute>
        }/>
        <Route path="/admin/feedbacks" element={
          <PrivateRoute adminOnly={true}><FeedbackAdmin /></PrivateRoute>
        }/>
        <Route path="/product/:id" element={
          <PrivateRoute><ProductDetails /></PrivateRoute>
        } />
        {/* <Route path="/order/:id" element={ <Order />} /> */}
        <Route path="/contact" element={
          <PrivateRoute><Contact /></PrivateRoute>
        } />
         {/* Add this route for /admin/contacts */}
        <Route path="/admin/contacts" element={<AdminContactList />} />
        <Route path="/feedback" element={
          <PrivateRoute><Feedback /></PrivateRoute>
        } />
        <Route path="/admin/messages" element={
          <PrivateRoute adminOnly={true}><AdminContactList /></PrivateRoute>
        } />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/about" element={<About />} />

        <Route path="/order/:id" element={<OrderPage />} />

      </Routes>
    </>
  );
}

export default App;