const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
  getMarks,
  getMark,
  getMaxMarks,
  setMaxMarks,
  editMarks,getMarkHeader,getMarksBySubject
} = require("../controllers/marksController");
router.get("/:selectedClass_name", getMarks);
router.get("/subjectmarks/:selectedClass_name/:subject_name", getMarksBySubject);
router.get("/detail/:class_name/:section/:id", getMark);
router.get("/maxmarks/:class_name", getMaxMarks);
router.get("/marksheader/:class_name", getMarkHeader);
router.post("/maxmarks/:class_name", setMaxMarks);
router.post("/edit/:class_name/:subject_name", editMarks);
module.exports = router;
