const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, require, unique: true },
  username: { type: String, require, unique: true },
  password: { type: String, require },
  joinedDate: { type: Date, default: new Date().toISOString() },
  posts: { type: Array, default: [] },
  avatar: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
  },
});

const postSchema = new mongoose.Schema({
  username: { type: String, require },
  avatar: { type: String },
  voteCount: { type: Number, default: 0 },
  url: { type: String, require },
  title: { type: String },
  content: { type: String },
});

const User = new mongoose.model("User", userSchema);
const Post = new mongoose.model("Post", postSchema);
module.exports = { User, Post };
