import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ContextCart } from '../App';

const PrivateRoute = ({ children }) => {
  const { userName } = useContext(ContextCart);

  // If user not logged in, redirect to login
  if (!userName) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute;
