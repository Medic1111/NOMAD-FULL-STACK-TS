const { Post, User } = require("../models/database");

const editPostControl = async (req, res) => {
  const { username, id } = req.params;
  const newPost = req.body;
  const { title, content, url, label } = newPost;

  await Post.findOne({ _id: id })
    .then(async (doc) => {
      doc.title = title;
      doc.url = url;
      doc.content = content;
      doc.label = label;

      await doc.save((err, update) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Oops, something went wrong" });
        return res.status(200).json({ message: "POST EDITED" });
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Oops, something went wrong" });
    });
};

module.exports = { editPostControl };
