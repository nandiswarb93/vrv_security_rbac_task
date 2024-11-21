import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Admin from "./components/Admin";
import { createContext, useEffect, useState } from "react";
import DashBoard from "./components/DashBoard";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";
import EmployeeEdit from "./components/EmployeeEdit";
import Logout from "./components/Logout";
import HomePage from "./components/HomePage";

export const store = createContext();

function App() {
  const [token, setToken] = useState(null);

  // To update adminName when it changes
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <store.Provider value={{ token, setToken }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/createemployee" element={<CreateEmployee />} />
          <Route path="/employeeslist" element={<EmployeeList />} />
          <Route path="/employeeedit" element={<EmployeeEdit />} />
          <Route path="/employeeedit/:id" element={<EmployeeEdit />} />
          <Route path="/employeelist/:name" element={<EmployeeList />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </store.Provider>
  );
}

export default App;
