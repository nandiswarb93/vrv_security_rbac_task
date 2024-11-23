import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css"; // Include Bootstrap styles

function EmployeeList() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [name, setName] = useState("");

  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [sortField, sortOrder]);

  const fetchData = async () => {
    try {
      const { data, status } = await axios.get(
        `https://vrv-security-rbac-task.onrender.com/employeelist?sortField=${sortField}&sortOrder=${sortOrder}`
      );
      if (status === 200) {
        setList(data.data);
        setFilteredList(data.data);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setName(term);

    const updatedList = list.filter((employee) =>
      employee.name.toLowerCase().includes(term)
    );

    setFilteredList(updatedList);
  };

  const handleEdit = (id) => {
    navigate(`/employeeedit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const { status } = await axios.delete(
        `https://vrv-security-rbac-task.onrender.com/employeelist/${id}`
      );
      if (status === 200) {
        setList((prevList) =>
          prevList.filter((employee) => employee._id !== id)
        );
        setFilteredList((prevList) =>
          prevList.filter((employee) => employee._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="container m-0">
      <Navbar />
      <h1 className="text-center mb-4">Employee List</h1>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="input-group" style={{ maxWidth: "400px" }}>
          <input
            id="search"
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={name}
            onChange={handleSearch}
          />
        </div>

        <div className="d-flex gap-3">
          <div>
            <label className="me-2">Sort By:</label>
            <select
              className="form-select"
              onChange={(e) => setSortField(e.target.value)}
              value={sortField}
              style={{ width: "150px" }}
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="_id">ID</option>
              <option value="createdDate">Date</option>
            </select>
          </div>
          <div>
            <label className="me-2">Order:</label>
            <select
              className="form-select"
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
              style={{ width: "150px" }}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      <h5>Total Count: {filteredList.length}</h5>
      <div className="table-responsive">
        <table className="table table-striped table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th>id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length > 0 ? (
              filteredList.map((ele, index) => (
                <tr key={ele._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={ele.image}
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
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(ele._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(ele._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
