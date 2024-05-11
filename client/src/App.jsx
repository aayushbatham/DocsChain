import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

const auth = {
  isAuthenticated: true,  
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return auth.isAuthenticated ? children : <Navigate to="/login" replace />;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  }
]);

export default router;