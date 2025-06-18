import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data and token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optionally, clear other app states or cookies if any

    // Redirect to login after logout
    navigate("/login", { replace: true });
  }, [navigate]);

  return null; // Or a loading spinner if you want
};

export default Logout;