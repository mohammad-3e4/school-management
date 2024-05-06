const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const uploadStudentsData = require("../middlewares/upload");
const {
  createStudent,
  getStudent,
  getStudents,
  deleteStudent,
  updateStudent,
  markAbsentStudent,
  getAbsents,
  markPresent,
  uploadDocuments,
  getStudentDocumentsById,
  deleteStudentDocument,
  uploadStudents,
  getStudentAbsents,
} = require("../controllers/studentController");

// Route to get all students
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("teacher", "admin"),
  getStudents
);
router.get("/absents", getAbsents);

router.delete("/present", markPresent);

// Routes for individual student
router
  .route("/:id")
  .get( getStudent)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteStudent)
  .post(isAuthenticatedUser, authorizeRoles("admin"), updateStudent);

router.put(
  "/attendance",
  isAuthenticatedUser,
  authorizeRoles("admin", "teacher"),
  markAbsentStudent
);
router.post(
  "/upload/data",
  isAuthenticatedUser,
  authorizeRoles("admin", "teacher"),
  uploadStudents
);
router.route('/absents/:studentId').get(getStudentAbsents)

router
  .route("/upload/:student_id")
  .post(isAuthenticatedUser, authorizeRoles("admin"), uploadDocuments)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getStudentDocumentsById)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteStudentDocument);

module.exports = router;
