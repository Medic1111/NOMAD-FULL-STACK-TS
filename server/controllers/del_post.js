const { Post, User } = require("../models/database");

const delPostControl = async (req, res) => {
  const { username, id } = req.params;
  await Post.findOneAndDelete({ _id: id })
    .then((doc) => console.log("Deleted from POST"))
    .catch(() => {
      res.status(500).json({ message: "Oops, something went wrong" });
    });

  await User.findOne({ username: username })
    .then(async (user) => {
      let filteredPosts = await user.posts.filter((post) => {
        return String(post._id) !== id;
      });
      user.posts = filteredPosts;

      await user.save((err, saved) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Oops, something went wrong" });

        res.status(200).json({ message: "POST DELETED" });
      });
    })
    .catch(() =>
      res.status(500).json({ message: "Oops, something went wrong" })
    );
};

module.exports = { delPostControl };
