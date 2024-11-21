const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  }
});

// Exporting the Registeruser model
const Registeruser = mongoose.model('Registeruser', userSchema);

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: [String],
    required: true,
  },
  image: {
    type: String, // Store image URL as a string
    required: true,
  },
});

// Exporting the CreateEmployee model
const CreateEmployee = mongoose.model('CreateEmployee', employeeSchema);

// Export both models
module.exports = { Registeruser, CreateEmployee };
