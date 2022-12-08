const { Post } = require("../models/database");

const getPostsControl = async (req, res) => {
  await Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({ message: "Oops, something went wrong" });
    });
};

module.exports = { getPostsControl };
