const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
  getBooks,
  getissuedBooks,
  addissuedBooks,
  deleteBook,
  updateBook,
  uploadBooks
} = require("../controllers/libraryController");
const { addBooks } = require("../controllers/libraryController");

router.get(
  "/books",
  // isAuthenticatedUser,
  // authorizeRoles("admin", "librarian"),
  getBooks
);
router.post(
  "/book",
  isAuthenticatedUser,
  authorizeRoles("admin", "librarian"),
  addBooks
);
router.get(
  "/issued-books",
  isAuthenticatedUser,
  authorizeRoles("admin", "librarian"),
  getissuedBooks
);
router.post(
  "/to-issue-book",
  isAuthenticatedUser,
  authorizeRoles("admin", "librarian"),
  addissuedBooks
);
router.post(
  "/upload/books",
  isAuthenticatedUser,
  authorizeRoles("admin", "librarian"),
  uploadBooks
);
router
  .route("/book/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin", "librarian"), deleteBook)
  .put(isAuthenticatedUser, authorizeRoles("admin", "librarian"), updateBook)
  .get(isAuthenticatedUser, authorizeRoles("admin", "librarian"), updateBook);

module.exports = router;
