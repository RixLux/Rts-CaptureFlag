const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { verifyEmail } = require("../controllers/authController");

router.get("/verify/:token", verifyEmail);

router.post("/register", register);
router.post("/login", login);

module.exports = router;
