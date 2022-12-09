const { User } = require("../models/database");

const getUserControl = async (req, res) => {
  let username = req.params.username;

  await User.findOne({ username: username })
    .then((user) => {
      let responseObj = {
        username: username,
        avatar: user.avatar,
        totalPosts: user.posts.length,
        posts: user.posts,
      };

      res.status(200).json(responseObj);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Oops, something went wrong with Mongo" });
    });
};

module.exports = { getUserControl };
