const { Post, Author } = require("../models");

// Create new post
// Create new post(s)
exports.createPost = async (req, res) => {
  try {
    const data = req.body; // can be object or array

    // Normalize data to array
    const postsArray = Array.isArray(data) ? data : [data];

    // Validate all authors exist
    for (const post of postsArray) {
      const author = await Author.findByPk(post.author_id);
      if (!author) return res.status(400).json({ message: `Author does not exist for post "${post.title}"` });
    }

    // Bulk create posts
    const createdPosts = await Post.bulkCreate(postsArray);

    res.status(201).json(createdPosts);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};


// Get all posts (optionally filter by author_id)
exports.getPosts = async (req, res) => {
  const { author_id } = req.query;
  const where = author_id ? { author_id } : {};
  
  const posts = await Post.findAll({
    where,
    include: { model: Author, attributes: ["name", "email"] }
  });

  res.json(posts);
};

// Get single post by ID + author info
exports.getPostById = async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: { model: Author, attributes: ["name", "email"] }
  });

  if (!post) return res.status(404).json({ message: "Post not found" });

  res.json(post);
};

// Update post
exports.updatePost = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  await post.update(req.body);
  res.json({ message: "Post updated successfully", post });
};

// Delete post
exports.deletePost = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  await post.destroy();
 res.json({ message: "Post deleted successfully" });
};
