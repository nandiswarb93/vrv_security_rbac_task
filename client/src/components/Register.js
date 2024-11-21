import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  // Error state
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    // Reset error message
    setError("");

    try {
      const { data, status } = await axios.post(
        "http://localhost:5000/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmpassword: formData.confirmpassword, // Only send required fields
        }
      );
     
      navigate("/login");

      if (status === 200) {
        alert("Registration successful!");
        // Set adminname in localStorage after successful registration
        localStorage.setItem("adminname", formData.username);

        // Clear form fields
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
        });

        // Redirect to login page
      }
    } catch (err) {
      // Extract detailed error message
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      console.error("Error:", errorMessage);
    }
  };

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">Register</h3>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmpassword"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <button className="btn btn-link" onClick={loginHandler}>
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
