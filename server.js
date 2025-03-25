require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require('./config/db.js');
const app = express();
app.use(express.json());


app.use(cors({
  origin:
 "https://bigcommerce.it.com/" 
}));


// Base route
app.use("/api" , async (req, res) => {
  res.json({ message: "Default API Route"});
});

const authRoutes = require("./routes/authRoutes")
app.use("/api/auth", authRoutes)

// Test DB route
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM `users`");
    res.json(rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Database connection failed");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
