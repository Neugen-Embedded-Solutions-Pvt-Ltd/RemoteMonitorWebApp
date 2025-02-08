// ProtectedRoutes.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import {  Navigate } from 'react-router-dom';

const RedirectToHome = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // Wait until loading is resolved
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect authenticated users to home
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};


export default RedirectToHome;