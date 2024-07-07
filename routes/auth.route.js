const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

router.post("/auth/register", authController.userRegistration);
router.get(
  "/auth/register/emailVerification/:token",
  authController.emailVerification
);
// router.post("/auth/login", authController.userLogin);
router.post("/auth/login", authController.userAndEmpLogin);

module.exports = router;
