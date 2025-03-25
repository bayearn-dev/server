const bcrypt = require('bcrypt');
const pool = require('../config/db')

const gUrefCode = async () => {
  let referralCode;
  let isUnique = false;

  while (!isUnique) {
    referralCode = Math.floor(10000000 + Math.random() * 89999999).toString();

    const [existingCode] = await pool.query(
      'SELECT id FROM users WHERE referralCode = ?', [referralCode]
    );

    if (existingCode.length === 0) {
      isUnique = true;
    }
  }

  return referralCode;
};
module.exports = { gUrefCode };

exports.registerUser = async (req, res) => {
  const { username, password, referredBy } = req.body;

  try {
    // Step 1: Check if referredBy code exists
    const [referrer] = await pool.query(
      'SELECT id FROM users WHERE referralCode = ?', [referredBy]
    );

    if (referrer.length === 0) {
      return res.status(400).json({ message: 'Invalid referral code provided.' });
    }

    // Step 2: Verify if username is unique
    const [existingUser] = await pool.query(
      'SELECT id FROM users WHERE username = ?', [username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // Step 3: Generate hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Generate a unique referral code for new user
    const userReferralCode = await gUrefCode();

    // Step 5: Insert the new user
    await pool.query(
      "INSERT INTO users (username, password, referralCode, referredBy, role, balance, vipLevel) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [username, hashedPassword, userReferralCode, referrer[0].id, 'user', 0, 'New User' ]
    );
    // Success response
    res.status(201).json({
      message: 'Registration successful.',
      referralCode: userReferralCode
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};