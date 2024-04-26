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
  editMarks,getMarkHeader,getMarksBySubject,editMaxMarks,getMaxMarkHeader
} = require("../controllers/marksController");
router.get("/:selectedClass_name", getMarks);
router.get("/subjectmarks/:selectedClass_name/:subject_name", getMarksBySubject);
router.get("/detail/:class_name/:section/:id", getMark);
router.get("/maxmarks/:class_name", getMaxMarks);
router.get("/marksheader/:class_name", getMarkHeader);
router.get("/maxmarksheader/:class_name", getMaxMarkHeader);
router.post("/maxmarks/:class_name", setMaxMarks);
router.post("/edit/:class_name/:subject_name", editMarks);
router.post("/editmaxmarks/:class_name", editMaxMarks);

module.exports = router;
