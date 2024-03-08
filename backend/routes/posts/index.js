const { Router } = require("express");
const Post = require("../../models/PostsModel");
const router = Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const offset = (page - 1) * limit;
  const posts = await Post.find({}).skip(offset).limit(limit);

  res.json(posts);
});

module.exports = router;
