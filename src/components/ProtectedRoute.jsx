import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ContextCart } from "../App";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userName } = useContext(ContextCart);


  if (userName === null) {
    return <div>Loading...</div>;
  }

  if (!userName) {
    return <Navigate to="/notfound" />;
  }

  if (!allowedRoles.includes(userName.role)) {
    return <Navigate to="/notfound" />;
  }

  return children;
};

export default ProtectedRoute;
