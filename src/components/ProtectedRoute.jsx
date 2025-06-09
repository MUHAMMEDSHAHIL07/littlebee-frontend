import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ContextCart } from "../App";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userName, loadingUser } = useContext(ContextCart);

  if (loadingUser) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!userName || !allowedRoles.includes(userName.role)) {
    return <Navigate to="/notfound" />;
  }

  return children;
};

export default ProtectedRoute;
