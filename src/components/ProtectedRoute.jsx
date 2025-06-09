import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ContextCart } from "../App";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userName, setUserName, loadingUser, setLoadingUser } = useContext(ContextCart);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !userName) {
      setUserName(JSON.parse(storedUser));
    }
    setLoadingUser(false); 
  }, [userName, setUserName, setLoadingUser]);

  if (loadingUser) {
    return <div className="text-center py-10">Loading...</div>;
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
