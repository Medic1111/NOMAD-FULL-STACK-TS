const { Post, User } = require("../models/database");

const createPostControl = async (req, res) => {
  const { title, content, url, username, avatar, label } = req.body;

  const newPost = new Post({
    title,
    content,
    url,
    username,
    avatar,
    label,
  });
  await newPost.save(async (err, doc) => {
    if (err)
      return res.status(500).json({ message: "Oops, something went wrong" });
    res.status(201).json({ message: "Created" });
  });
};

module.exports = { createPostControl };
