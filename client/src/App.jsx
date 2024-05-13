import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Upload from './pages/DocumentUploadPage';
import Verify from './pages/DocumentVerificationPage';

// const auth = {
//   isAuthenticated: true,
// };

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return localStorage.getItem('isAuthenticated') ? <Dashboard /> : <Login />;
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
  },
  {
    path: "/dashboard/upload",
    element: <Upload/>,
  },
  {
    path: "/dashboard/verify",
    element: <Verify/>,
  }
]);

export default router;