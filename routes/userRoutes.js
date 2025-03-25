const express = require("express");
const { getUserProfile, updateVipLevel } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// GET /api/user/profile
router.get("/profile", verifyToken, getUserProfile);

// PATCH /api/user/vip
router.patch("/vip", verifyToken, updateVipLevel);

module.exports = router;
