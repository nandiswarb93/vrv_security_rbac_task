import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the admin data from localStorage on logout
    localStorage.removeItem("adminname");
    localStorage.removeItem("token");


    // Redirect to the homepage or login page
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <h1>You have been logged out</h1>
    </div>
  );
}

export default Logout;
