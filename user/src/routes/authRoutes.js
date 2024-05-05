const express = require("express");
const authController = require("../controllers/authController");
const jwtVerifyController = require("../controllers/jwtVerifyController");
const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/refreshToken", authController.refreshToken);
router.post("/verifyToken", jwtVerifyController.verifiedToken);

module.exports = router;
