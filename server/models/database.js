const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, require, unique: true },
  username: { type: String, require, unique: true },
  password: { type: String, require },
  joinedDate: { type: Date, default: new Date().toISOString() },
  posts: { type: Array, default: [] },
  avatar: { type: String, default: "" },
});

const User = new mongoose.model("User", userSchema);

module.exports = { User };
