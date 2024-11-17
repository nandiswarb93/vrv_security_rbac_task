// import React, { useState } from "react";
// import axios from "axios";
// import Admin from "./Admin";
// import "../App.css";

// function CreateEmployee() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     designation: "",
//     gender: "",
//     course: [],
//     image: null,
//   });

//   const [error, setError] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type === "checkbox") {
//       if (checked) {
//         setFormData({
//           ...formData,
//           [name]: [...formData[name], value],
//         });
//       } else {
//         setFormData({
//           ...formData,
//           [name]: formData[name].filter((item) => item !== value),
//         });
//       }
//     } else if (type === "file") {
//       setFormData({ ...formData, image: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate fields
//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.mobile ||
//       !formData.designation ||
//       !formData.gender ||
//       !formData.course.length ||
//       !formData.image
//     ) {
//       setError("All fields are required!");
//       return;
//     }

//     // Email validation
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailPattern.test(formData.email)) {
//       setError("Invalid email format!");
//       return;
//     }

//     // Mobile number validation
//     const mobilePattern = /^[0-9]{10}$/;
//     if (!mobilePattern.test(formData.mobile)) {
//       setError("Invalid mobile number! It should be 10 digits.");
//       return;
//     }

//     // File validation (only jpg or png)
//     if (formData.image && !/\.(jpg|jpeg|png)$/i.test(formData.image.name)) {
//       setError("Only JPG and PNG files are allowed.");
//       return;
//     }

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("name", formData.name);
//       formDataToSend.append("email", formData.email);
//       formDataToSend.append("mobile", formData.mobile);
//       formDataToSend.append("designation", formData.designation);
//       formDataToSend.append("gender", formData.gender);
//       formDataToSend.append("course", formData.course);
//       formDataToSend.append("image", formData.image);

//       const response = await axios.post(
//         "http://localhost:5000/createemployee",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert("Employee created successfully!");
//       }
//     } catch (error) {
//       console.error(error);
//       setError("Server error. Please try again later.");
//     }
//   };

//   return (
//     <div>
//       <Admin />
//       <h1>Create Employee</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit} className="employee-form">
//         <div className="form-group">
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
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
//             value={formData.email}
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
//             value={formData.mobile}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="designation">Designation</label>
//           <select
//             id="designation"
//             name="designation"
//             value={formData.designation}
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
//               checked={formData.gender === "Male"}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="male">Male</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="female"
//               name="gender"
//               value="Female"
//               checked={formData.gender === "Female"}
//               onChange={handleChange}
//               required
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
//               checked={formData.course.includes("MCA")}
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
//               checked={formData.course.includes("BCA")}
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
//               checked={formData.course.includes("BSC")}
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
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default CreateEmployee;

import React, { useState } from "react";
import axios from "axios";
import Admin from "./Admin";
import "../App.css";

function CreateEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
  });

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          [name]: [...formData[name], value],
        });
      } else {
        setFormData({
          ...formData,
          [name]: formData[name].filter((item) => item !== value),
        });
      }
    } else if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.designation ||
      !formData.gender ||
      !formData.course.length ||
      !formData.image
    ) {
      setError("All fields are required!");
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setError("Invalid email format!");
      return;
    }

    // Mobile number validation
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(formData.mobile)) {
      setError("Invalid mobile number! It should be 10 digits.");
      return;
    }

    // File validation (only jpg or png)
    if (formData.image && !/\.(jpg|jpeg|png)$/i.test(formData.image.name)) {
      setError("Only JPG and PNG files are allowed.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("designation", formData.designation);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("course", formData.course);
      formDataToSend.append("image", formData.image);

      const response = await axios.post(
        "http://localhost:5000/createemployee",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Employee created successfully!");
      }
    } catch (error) {
      console.error(error);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <Admin />
      <h1>Create Employee</h1>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
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
            value={formData.email}
            onChange={handleChange}
            className="form-control"
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
            value={formData.mobile}
            onChange={handleChange}
            className="form-control"
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
            value={formData.designation}
            onChange={handleChange}
            className="form-select"
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
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              className="form-check-input"
              required
            />
            <label htmlFor="male" className="form-check-label ms-2">
              Male
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              className="form-check-input"
              required
            />
            <label htmlFor="female" className="form-check-label ms-2">
              Female
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Course</label>
          <div>
            <input
              type="checkbox"
              id="mca"
              name="course"
              value="MCA"
              checked={formData.course.includes("MCA")}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="mca" className="form-check-label ms-2">
              MCA
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="bca"
              name="course"
              value="BCA"
              checked={formData.course.includes("BCA")}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="bca" className="form-check-label ms-2">
              BCA
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="bsc"
              name="course"
              value="BSC"
              checked={formData.course.includes("BSC")}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="bsc" className="form-check-label ms-2">
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
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateEmployee;
