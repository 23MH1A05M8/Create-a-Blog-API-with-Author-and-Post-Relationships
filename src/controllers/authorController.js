const { Author, Post } = require("../models");

// Create new author
exports.createAuthor = async (req, res) => {
  try {
    const data = req.body;

    let authors;
    if (Array.isArray(data)) {
      // If array, use bulkCreate
      authors = await Author.bulkCreate(data);
    } else {
      // If single object, use create
      authors = await Author.create(data);
    }

    res.status(201).json(authors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Get all authors
exports.getAuthors = async (req, res) => {
  const authors = await Author.findAll();
  res.json(authors);
};

// Get author by ID
exports.getAuthorById = async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.json(author);
};

// Update author
exports.updateAuthor = async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  if (!author) return res.status(404).json({ message: "Author not found" });

  await author.update(req.body);
  res.json({ message: "Author updated successfully", author });
};

// Delete author (cascade deletes posts)
exports.deleteAuthor = async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  if (!author) return res.status(404).json({ message: "Author not found" });

  await author.destroy(); // CASCADE delete
  res.json({ message: "Author deleted successfully" });
};

// Get all posts for an author
exports.getAuthorPosts = async (req, res) => {
  const posts = await Post.findAll({
    where: { author_id: req.params.id }
  });
  res.json(posts);
};
