const { Post } = require("../models/database");

const getSpecPostControl = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  Post.findOne({ _id: id })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Oops, something went wrong with Mongo" });
    });
};
module.exports = { getSpecPostControl };
