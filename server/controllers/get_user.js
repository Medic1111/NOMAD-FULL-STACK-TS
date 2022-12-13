const { User, Post } = require("../models/database");

const getUserControl = async (req, res) => {
  let username = req.params.username;
  let user;
  let posts;

  await User.findOne({ username: username })
    .then((userRet) => {
      user = {
        username: username,
        avatar: userRet.avatar,
      };
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Oops, something went wrong with Mongo" });
    });

  await Post.find({ username: username })
    .then((postsArr) => {
      posts = postsArr;
      res.status(200).json({ ...user, posts, totalPosts: posts.length });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Oops, something went wrong with Mongo" });
    });
};

module.exports = { getUserControl };
