import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Admin from "./Admin";

function EmployeeEdit() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    image: "",
  });
  console.log(employee, "employee");
  const { id } = useParams(); // Get employee ID from the URL
  const navigate = useNavigate();

  // Fetch employee data by ID
  const fetchEmployeeData = async (id) => {
    try {
      const { data } = await axios.get(
        `https://vrv-security-rbac-task.onrender.com/employeeedit/${id}`
      );
      console.log(data, "response data");

      const formattedData = {
        ...data,
        course: Array.isArray(data.course) ? data.course : [data.course],
      };

      setEmployee(formattedData); // Populate form with existing data
      console.log(formattedData, "state data");
    } catch (error) {
      console.error("Error fetching employee data:", error);
      alert("Failed to fetch employee details.");
    }
  };

  useEffect(() => {
    if (id) fetchEmployeeData(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(value, "checked value");

    if (type === "checkbox") {
      setEmployee((prevState) => ({
        ...prevState,
        course: checked
          ? [...prevState.course, value] // Add course if checked
          : prevState.course.filter((course) => course !== value), // Remove course if unchecked
      }));
    } else {
      setEmployee((prevState) => ({
        ...prevState,
        [name]: value, // Update other fields
      }));
    }
  };

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_cloudinary_preset"); // Replace with your Cloudinary preset

    try {
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );
      setEmployee({ ...employee, image: uploadResponse.data.secure_url });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://vrv-security-rbac-task.onrender.com/employeelist/${id}`,
        employee
      );
      if (response.status === 200) {
        alert("Employee updated successfully!");
        navigate("/employeeslist"); // Redirect after successful update
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee.");
    }
  };

  return (
    <div className="container m-0">
      <Admin />
      <h2 className="text-center mb-4">Edit Employee</h2>
      <form onSubmit={(e) => handleSubmit(e, id)} className="employee-form">
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile No
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            className="form-control"
            value={employee.mobile}
            onChange={handleChange}
            required
          />
        </div>

        {/* Designation */}
        <div className="mb-3">
          <label htmlFor="designation" className="form-label">
            Designation
          </label>
          <select
            id="designation"
            name="designation"
            className="form-select"
            value={employee.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              className="form-check-input"
              checked={employee.gender === "Male"}
              onChange={handleChange}
            />
            <label htmlFor="male" className="form-check-label">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              className="form-check-input"
              checked={employee.gender === "Female"}
              onChange={handleChange}
            />
            <label htmlFor="female" className="form-check-label">
              Female
            </label>
          </div>
        </div>

        {/* Courses */}
        <div className="mb-3">
          <label className="form-label">Courses</label>
          {["MCA", "BCA", "BSC"].map((course) => (
            <div className="form-check" key={course}>
              <input
                type="checkbox"
                id={course.toLowerCase()}
                name="course"
                value={course}
                className="form-check-input"
                checked={employee.course.includes(course)}
                onChange={handleChange}
              />
              <label
                htmlFor={course.toLowerCase()}
                className="form-check-label"
              >
                {course}
              </label>
            </div>
          ))}
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image Upload (JPG/PNG only)
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            onChange={handleImageChange}
          />
          {employee.image && (
            <img
              src={employee.image}
              alt="Employee"
              width="100"
              height="100"
              style={{
                marginTop: "10px",
                borderRadius: "10px",
              }}
            />
          )}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeEdit;
