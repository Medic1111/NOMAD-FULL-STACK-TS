const { Post } = require("../models/database");

const upVoteControl = async (req, res) => {
  let { username, id } = req.params;
  await Post.findOne({ _id: id })
    .then(async (post) => {
      post.voteCount++;
      post.up_by.push(username);
      await post.save((err, update) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Oops, something went wrong" });
        res.status(200).json(update);
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Oops, something went wrong" });
    });
};

module.exports = { upVoteControl };
