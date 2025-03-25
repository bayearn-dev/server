const pool = require('../config/db');

exports.createDeposit = async (req, res) => {
  const { amount, method, transaction_id, proof_image } = req.body;
  await pool.query(
    'INSERT INTO deposits (user_id, amount, method, transaction_id, proof_image) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, amount, method, transaction_id, proof_image]
  );
  res.status(201).json({ message: "Deposit request submitted successfully." });
};

exports.getUserDeposits = async (req, res) => {
  const [deposits] = await pool.query(
    'SELECT * FROM deposits WHERE user_id = ? ORDER BY created_at DESC', 
    [req.user.id]
  );
  res.json(deposits);
};
