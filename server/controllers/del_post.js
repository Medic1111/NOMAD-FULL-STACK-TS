const { Post, User } = require("../models/database");

const delPostControl = async (req, res) => {
  const { username, id } = req.params;
  await Post.findOneAndDelete({ _id: id })
    .then((doc) => {
      Post.find()
        .then((all) => res.status(200).json(all))
        .catch((err) =>
          res.status(500).json({ message: "Oops, something went wrong" })
        );
    })
    .catch(() => {
      res.status(500).json({ message: "Oops, something went wrong" });
    });
};

module.exports = { delPostControl };
