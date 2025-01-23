// ProtectedRoutes.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    // Use useEffect for side effects instead of rendering logic
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;