import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function EmployeeList() {
  const [list, setList] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook for redirection

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch employee list from backend
  const fetchData = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:5000/employeelist"
      );
      if (status === 200) {
        setList(data.data); // Update the employee list in state
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  // Handle edit redirection
  const handleEdit = (id) => {
    navigate(`/employeeedit/${id}`);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/employeelist/${id}`
      );
      if (response.status === 200) {
        // Remove the deleted employee from the list in the UI
        setList((prevList) =>
          prevList.filter((employee) => employee._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Employee List</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((ele, index) => (
              <tr key={ele._id}>
                <td>{index + 1}</td>
                <td>
                  {/* Display image using Cloudinary URL */}
                  <img
                    src={ele.image} // Cloudinary URL stored in database
                    alt={ele.name}
                    width="50"
                    height="50"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                </td>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{ele.mobile}</td>
                <td>{ele.designation}</td>
                <td>{ele.gender}</td>
                <td>{ele.course}</td>
                <td>{new Date().toLocaleDateString()}</td>

                <td>
                  <button onClick={() => handleEdit(ele._id)}>Edit</button>
                  <button onClick={() => handleDelete(ele._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
