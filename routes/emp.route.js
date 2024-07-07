const express = require("express");
const router = express.Router();
const empController = require("../controller/emp.controller");
const authenticate = require("../middleware/authenticate");
const authorization = require("../middleware/authorization");

router.get(
  "/",
  authenticate(),
  authorization(["ORG_ADMIN"]),
  empController.getEmployees
);
router.post(
  "/add",
  authenticate(),
  authorization(["ORG_ADMIN"]),
  empController.addEmployee
);
router.delete(
  "/delete/:empId",
  authenticate(),
  authorization(["ORG_ADMIN"]),
  empController.deleteEmployee
);
router.put(
  "/update/:empId",
  authenticate(),
  authorization(["ORG_ADMIN"]),
  empController.updateEmployee
);

module.exports = router;
