const { Post, User } = require("../models/database");

const createPostControl = async (req, res) => {
  const { title, content, url, username, avatar, label } = req.body;
  let user;
  await User.findOne({ username: username })
    .then((doc) => {
      user = doc;
    })
    .catch((err) => {
      return res.status(500).json({ message: "Oops, something went wrong" });
    });

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
    user.posts.unshift(doc);
    await user.save((err, updatedUser) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Oops, something went wrong!!!" });
      res.status(201).json(updatedUser);
    });
  });
};

module.exports = { createPostControl };
