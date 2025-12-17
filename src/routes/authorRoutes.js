const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

// CRUD routes for authors
router.post("/", authorController.createAuthor);
router.get("/", authorController.getAuthors);
router.get("/:id", authorController.getAuthorById);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);
router.get("/:id/posts", authorController.getAuthorPosts);

module.exports = router;
