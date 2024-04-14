import React from 'react'
import Upload from './services/ipfsService';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);


// const App = () => {
//   return (
//     <>
//       <Homepage/>
//     </>
//   )
// }



export default router