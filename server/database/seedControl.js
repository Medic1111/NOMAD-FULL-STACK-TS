const { Post } = require("../models/database");
const { mockData } = require("./mock");

const seedControl = async (req, res) => {
  await Post.insertMany(mockData)
    .then((serverRes) => res.status(201).json("DB Seeded"))
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong with Mongo" });
    });
};

module.exports = { seedControl };
