// controllers/authController.js
const bcrypt = require('bcrypt');
const pool = require('../config/db');

exports.registerUser = async (req, res) => {
  try {
    // your registration logic here
    res.json({ message: "Registered" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // your login logic here
    res.json({ message: "Logged in" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    // your get user logic here
    res.json({ message: "User details" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
