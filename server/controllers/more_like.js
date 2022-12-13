const { Post } = require("../models/database");

const moreLikeControl = async (req, res) => {
  const label = req.params.label;

  await Post.find({ label: label })
    .then((filteredPost) => res.status(200).json(filteredPost))
    .catch((err) =>
      res.status(500).json({ message: "Oops, something went wrong" })
    );
};

module.exports = { moreLikeControl };
