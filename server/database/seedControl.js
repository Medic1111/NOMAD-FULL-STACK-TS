const { Post, User } = require("../models/database");
const { mockData, mockUsers } = require("./mock");

const seedControl = async (req, res) => {
  await Post.insertMany(mockData)
    .then((serverRes) => console.log("Posts seeded"))
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Something went wrong with Mongo" });
    });

  await User.insertMany(mockUsers)
    .then((serverRes) => console.log("Users Seeded"))
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Something went wrong with Mongo" });
    });

  res.status(201).json("DB Seeded");
};

module.exports = { seedControl };
