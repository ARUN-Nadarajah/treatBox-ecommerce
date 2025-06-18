import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const AuthGuard: React.FC<Props> = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  if (!token || !userRaw) return <Navigate to="/login" replace />;

  const user = JSON.parse(userRaw);

  if (requireAdmin && user.role == "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;