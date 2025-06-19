import React from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute: React.FC<Props> = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (!token || !userData) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userData);
  const isAdmin = user?.role === "admin"; // or user.role === "admin"

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;