const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
  getClasses,
  assignSubject,
  removeAssignSubject,
  addSubjectInClass,
  createClass,
  getSubjectsFromClas,
  removeSubjectFromClass,
  updateClass,
  getClassSubject
} = require("../controllers/classController");
router
  .get("/", getClasses)
  .post("/", isAuthenticatedUser, authorizeRoles("admin"), createClass);
router
  .route("/subject")
  .get( getSubjectsFromClas)
  .post(isAuthenticatedUser, authorizeRoles("admin"), addSubjectInClass)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), removeSubjectFromClass);

router
  .route("/update")
  .post(isAuthenticatedUser, authorizeRoles("admin"), updateClass);
router
  .route("/assign/teacher")
  .post(isAuthenticatedUser, authorizeRoles("admin"), assignSubject);
router
  .route("/remove/teacher")
  .post(isAuthenticatedUser, authorizeRoles("admin"), removeAssignSubject);
router.get("/subject/:selectedClass",isAuthenticatedUser, authorizeRoles("admin", 'teacher'), getClassSubject)
module.exports = router;
