import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { store } from "../App"; // Context to manage token globally

const Login = () => {
  const navigate = useNavigate();

  // Use context to get and set the token
  const { token, setToken } = useContext(store);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // State to manage errors
  const [error, setError] = useState("");

  // Handle input changes
  const changeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend for authentication
      const response = await axios.post(
        "https://vrv-security-rbac-task.onrender.com/login",
        loginData
      );

      // Check if the response contains a token
      if (response.status === 200 && response.data.token) {
        const receivedToken = response.data.token;

        // Store the token in context and localStorage
        setToken(receivedToken);
        localStorage.setItem("token", receivedToken);
        localStorage.setItem("adminname", loginData.email);

        alert("Login successful!");
        // Clear the form fields
        setLoginData({ email: "", password: "" });

        // Redirect to the admin page
        navigate("/admin");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
    navigate("/dashboard");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">Login</h3>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={submitHandler} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={loginData.email}
              onChange={changeHandler}
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
              value={loginData.password}
              onChange={changeHandler}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
