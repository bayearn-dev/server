const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { adminProtect } = require('../middleware/authMiddleware');

// Protected route (admin only)
router.post('/add', adminProtect, productController.addProduct);

module.exports = router;
