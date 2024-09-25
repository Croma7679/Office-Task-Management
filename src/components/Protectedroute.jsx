import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
