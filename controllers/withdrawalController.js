const pool = require('../config/db');
exports.createWithdrawal = async (req, res) => {
    const { amount, method, wallet_address } = req.body;
    
    const [user] = await pool.query('SELECT balance FROM users WHERE id = ?', [req.user.id]);
    if (user[0].balance < amount) {
      return res.status(400).json({ message: "Insufficient balance." });
    }
  
    await pool.query(
      'INSERT INTO withdrawals (user_id, amount, method, wallet_address) VALUES (?, ?, ?, ?)',
      [req.user.id, amount, method, wallet_address]
    );
    
    res.status(201).json({ message: "Withdrawal request submitted successfully." });
  };
  