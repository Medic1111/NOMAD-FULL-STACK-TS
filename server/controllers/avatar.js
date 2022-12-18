const { User, Post } = require("../models/database");

const avatarControl = async (req, res) => {
  let username = req.params.user;
  let newUrl = req.body.url;
  let newPostArr;

  await Post.find({ username: username })
    .then(async (postArr) => {
      newPostArr = postArr;
      await newPostArr.forEach(async (post) => {
        post.avatar = newUrl;
        await post.save((err, update) => {
          if (err) return res.status(500).send("Oops, something went wrong");
        });
      });
    })
    .catch((err) => res.status(500).send("Oops, something went wrong"));

  await User.findOne({ username: username })
    .then(async (user) => {
      user.avatar = newUrl;
      user.posts = newPostArr;
      await user.save((err, update) => {
        if (err) return res.status(500).send("Oops, something went wrong");
        res.status(200).send("Listening");
      });
    })
    .catch((err) => res.status(500).send("Oops, something went wrong"));
};

module.exports = { avatarControl };
