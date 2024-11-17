import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "../App.css";

function Admin() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 p-0">
          <Navbar />
          <div className="nav flex-column p-3">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/createemployee" className="nav-link">
              Create Employee
            </Link>
            <Link to="/employeeedit" className="nav-link">
              Employee Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
