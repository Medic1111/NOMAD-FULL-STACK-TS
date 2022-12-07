const { User } = require("../models/database");

const getUserControl = async (req, res) => {
  let username = req.params.username;
  await User.findOne({ username: username })
    // MOCK DATA USERS DO NOT EXITS
    // WILL TRIGGER ERR...CANNOT BE FOUND

    .then((user) => {
      console.log(user);
      let responseObj = {
        username: username,
        avatar: user.avatar,
        totalPosts: user.posts.length,
        posts: user.posts,
      };

      res.status(200).json(responseObj);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Oops, something went wrong with Mongo" });
    });
};

module.exports = { getUserControl };
