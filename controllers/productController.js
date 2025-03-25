const pool = require('../config/db');

exports.addProduct = async (req, res) => {
  const { name, description, price, commission, vipLevel, imageUrl } = req.body;

  try {
    await pool.query(
      'INSERT INTO products (name, description, price, commission, vipLevel, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, commission, vipLevel, imageUrl]
    );

    res.status(201).json({ message: "Product added successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
