import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";

const Logout = async () => {
  try {
    const response = await fetch("http://localhost:4000/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 200) {
      Cookies.remove("jwtToken");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const Sidebar = () => {

  return (
    <div className="sidebar">
      {/* <div className="username">{username}</div> */}
      <ul>
        <li>
          <Link to="/dashboard/upload">Upload Document</Link>
        </li>
        <li>
          <Link to="/dashboard/verify">Verify Document</Link>
        </li>
        <li>
          <Link to="/dashboard/settings">User Settings</Link>
        </li>
        <li>
          <button onClick={Logout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        {/* Content of the dashboard */}
      </div>
    </div>
  );
};

export default Dashboard;
