require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Registeruser, CreateEmployee } = require("./model");
const middleware = require("./middleware");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERROR:", err));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "employees",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage });

// Register user route
app.post("/register", async (req, res) => {
  try {
    console.log(req.body); // Log the incoming request body

    const { username, email, password, confirmpassword } = req.body;

    // Check if all fields are present
    if (!username || !email || !password || !confirmpassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newUser = new Registeruser({
      username,
      email,
      password,
      confirmpassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Registeruser.findOne({ email });
    if (!user || user.password !== password)
      return res.status(400).json({ error: "Invalid Credentials" });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Create Employee route (with image upload)
app.post("/createemployee", upload.single("image"), async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const newEmployee = new CreateEmployee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image,
    });
    await newEmployee.save();
    res.status(200).json({ message: "Employee created successfully!" });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/employeelist", async (req, res) => {
  try {
    // Extract sortField and sortOrder from query parameters, with default values
    const { sortField = "name", sortOrder = "asc" } = req.query;

    // Determine sorting order (1 for ascending, -1 for descending)
    const order = sortOrder === "desc" ? -1 : 1;

    // Fetch employees from the database with sorting
    const employees = await CreateEmployee.find().sort({ [sortField]: order });

    // Check if employees exist
    if (!employees.length) {
      return res.status(404).json({ error: "No employees found" });
    }

    res.status(200).json({ data: employees });
  } catch (error) {
    console.error("Error fetching employee data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update employee route
app.put("/employeelist/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, course, image } = req.body;
  const updatedData = {
    name,
    email,
    mobile,
    designation,
    gender,
    course,
    image,
  };
  console.log(id, updatedData, "updated data.....");

  try {
    const updatedEmployee = await CreateEmployee.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete employee route
app.delete("/employeelist/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await CreateEmployee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update single employee route
app.put("/employeeedit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedEmployee = await CreateEmployee.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single employee for edit
app.get("/employeeedit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await CreateEmployee.findById(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});



// Protected route (user profile)
app.get("/myprofile", middleware, async (req, res) => {
  try {
    const user = await Registeruser.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Test route
app.get("/", (req, res) => res.send("Hello World"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
