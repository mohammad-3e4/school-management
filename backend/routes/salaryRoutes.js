const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
    getSalary,createSalary,paySalary,getSalaryStructureById
} = require("../controllers/salaryController");

router.get("/", getSalary);
router.post("/create", createSalary);
router.post("/pay", paySalary);
router.get("/:id", getSalaryStructureById);




module.exports = router;