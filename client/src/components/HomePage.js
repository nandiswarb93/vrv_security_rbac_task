import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const registerHandler = () => {
    navigate("/register");
  };

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <h1>Welcome to Admin Panel Project using MERN Stack</h1>
        <h3
          onClick={registerHandler}
          className="text-primary my-3"
          style={{ cursor: "pointer" }}
        >
          Click here for register
        </h3>
        <h3
          onClick={loginHandler}
          className="text-primary my-3"
          style={{ cursor: "pointer" }}
        >
          Click here for Login
        </h3>
      </div>
    </div>
  );
}

export default HomePage;
