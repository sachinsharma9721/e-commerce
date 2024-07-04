const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/auth/register", userController.userRegistration);
router.get(
  "/auth/register/emailVerification/:token",
  userController.emailVerification
);
router.post("/auth/login", userController.userLogin);

module.exports = router;
