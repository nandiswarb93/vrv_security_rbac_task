import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../App";

function Navbar() {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    setAdminName(localStorage.getItem("adminname"));
  }, []);
  return (
    <nav className="navbar navbar-expand-lg d-flex">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/employeeslist" className="nav-link">
              Employees List
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </li>
          <li className="nav-item">
            {/* If you want to display the admin name */}
            <span className="nav-link">{adminName}</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
