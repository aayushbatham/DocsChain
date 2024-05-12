import React from "react";
import UploadIpfs from "../services/ipfsService.jsx";
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
      window.location.href = "/";
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const Dashboard = () => {
  return (
    <div>
      <UploadIpfs/>
      <button
        onClick={Logout}
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 mt-5 px-4 rounded"
      >
      Logout
      </button>
    </div>
  );
};

export default Dashboard;
