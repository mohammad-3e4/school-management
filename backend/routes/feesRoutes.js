const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
  getFees,getfeeByStudentID,createFees,createFeeStructure,getFeeStructure,updateFeeStructure,deleteFeeStructure,getFeeStructureByClass
} = require("../controllers/feesController");

router.get("/class/:selectedClass", getFees);
router.get("/structure", getFeeStructure);
router.get("/structure/:class_value", getFeeStructureByClass);
router.post("/",createFees);
router.post("/structure",createFeeStructure);
router.post("/update/structure/:id",updateFeeStructure);
router.get("/:id", getfeeByStudentID);
router.delete("/delete/structure/:id",deleteFeeStructure)
module.exports = router;
