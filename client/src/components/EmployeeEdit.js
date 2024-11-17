// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import Admin from "./Admin";

// function EmployeeEdit() {
//   const [employee, setEmployee] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     designation: "",
//     gender: "",
//     course: [],
//     image: "",
//   });

//   const { id } = useParams(); // Get employee ID from the URL
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchEmployeeData();
//   }, [id]);

//   // Fetch existing employee data by ID
//   const fetchEmployeeData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/employeelist/${id}`
//       );
//       setEmployee(response.data);
//     } catch (error) {
//       console.error("Error fetching employee data:", error);
//     }
//   };

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === "checkbox") {
//       const updatedCourses = checked
//         ? [...employee.course, value]
//         : employee.course.filter((course) => course !== value);
//       setEmployee({ ...employee, course: updatedCourses });
//     } else {
//       setEmployee({ ...employee, [name]: value });
//     }
//   };

//   // Handle image upload
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "your_cloudinary_preset"); // Replace with your Cloudinary upload preset

//     try {
//       const uploadResponse = await axios.post(
//         "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
//         formData
//       );
//       setEmployee({ ...employee, image: uploadResponse.data.secure_url });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Send updated data to backend
//       const response = await axios.put(
//         `http://localhost:5000/employeelist/${id}`,
//         employee
//       );
//       if (response.status === 200) {
//         navigate("/employeelist"); // Redirect after successful update
//         alert("updating");
//       }
//     } catch (error) {
//       console.error("Error updating employee:", error);
//       alert("not updating");
//     }
//   };

//   return (
//     <div>
//       <Admin />
//       <form onSubmit={handleSubmit} className="employee-form">
//         <div className="form-group">
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={employee.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={employee.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="mobile">Mobile No</label>
//           <input
//             type="text"
//             id="mobile"
//             name="mobile"
//             value={employee.mobile}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="designation">Designation</label>
//           <select
//             id="designation"
//             name="designation"
//             value={employee.designation}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Designation</option>
//             <option value="HR">HR</option>
//             <option value="Manager">Manager</option>
//             <option value="Sales">Sales</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Gender</label>
//           <div>
//             <input
//               type="radio"
//               id="male"
//               name="gender"
//               value="Male"
//               checked={employee.gender === "Male"}
//               onChange={handleChange}
//             />
//             <label htmlFor="male">Male</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="female"
//               name="gender"
//               value="Female"
//               checked={employee.gender === "Female"}
//               onChange={handleChange}
//             />
//             <label htmlFor="female">Female</label>
//           </div>
//         </div>

//         <div className="form-group">
//           <label>Course</label>
//           <div>
//             <input
//               type="checkbox"
//               id="mca"
//               name="course"
//               value="MCA"
//               checked={employee.course.includes("MCA")}
//               onChange={handleChange}
//             />
//             <label htmlFor="mca">MCA</label>
//           </div>
//           <div>
//             <input
//               type="checkbox"
//               id="bca"
//               name="course"
//               value="BCA"
//               checked={employee.course.includes("BCA")}
//               onChange={handleChange}
//             />
//             <label htmlFor="bca">BCA</label>
//           </div>
//           <div>
//             <input
//               type="checkbox"
//               id="bsc"
//               name="course"
//               value="BSC"
//               checked={employee.course.includes("BSC")}
//               onChange={handleChange}
//             />
//             <label htmlFor="bsc">BSC</label>
//           </div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="image">Image Upload (JPG/PNG only)</label>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             onChange={handleImageChange}
//           />
//           {employee.image && (
//             <img
//               src={employee.image}
//               alt="Employee"
//               width="100"
//               height="100"
//               style={{ marginTop: "10px", borderRadius: "10px" }}
//             />
//           )}
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default EmployeeEdit;

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

  const { id } = useParams(); // Get employee ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeData();
  }, [id]);

  // Fetch existing employee data by ID
  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/employeelist/${id}`
      );
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedCourses = checked
        ? [...employee.course, value]
        : employee.course.filter((course) => course !== value);
      setEmployee({ ...employee, course: updatedCourses });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_cloudinary_preset"); // Replace with your Cloudinary upload preset

    try {
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );
      setEmployee({ ...employee, image: uploadResponse.data.secure_url });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated data to backend
      const response = await axios.put(
        `http://localhost:5000/employeelist/${id}`,
        employee
      );
      if (response.status === 200) {
        navigate("/employeelist"); // Redirect after successful update
        alert("Updating successful");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Update failed");
    }
  };

  return (
    <div className="container mt-4">
      <Admin />
      <h2 className="text-center mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="employee-form">
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

        <div className="mb-3">
          <label className="form-label">Courses</label>
          <div className="form-check">
            <input
              type="checkbox"
              id="mca"
              name="course"
              value="MCA"
              className="form-check-input"
              checked={employee.course.includes("MCA")}
              onChange={handleChange}
            />
            <label htmlFor="mca" className="form-check-label">
              MCA
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="bca"
              name="course"
              value="BCA"
              className="form-check-input"
              checked={employee.course.includes("BCA")}
              onChange={handleChange}
            />
            <label htmlFor="bca" className="form-check-label">
              BCA
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="bsc"
              name="course"
              value="BSC"
              className="form-check-input"
              checked={employee.course.includes("BSC")}
              onChange={handleChange}
            />
            <label htmlFor="bsc" className="form-check-label">
              BSC
            </label>
          </div>
        </div>

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
