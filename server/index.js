// MODULES/PACKAGES
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const formidable = require("express-formidable");

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
});

const app = express();

// PERSONAL REQUIRES
const {
  registerRoute,
  loginRoute,
  verificationRoute,
} = require("./routes/auth");
const getPostsRoute = require("./routes/get_posts");
const getSpecPostRoute = require("./routes/get_spec_post");
const getUserRoute = require("./routes/get_user");
const createPostRoute = require("./routes/create_post");
const delPostRoute = require("./routes/del_post");
const avatarRoute = require("./routes/avatar");
const upVoteRoute = require("./routes/up_vote");
const editPostRoute = require("./routes/edit_post");
const moreLikeRoute = require("./routes/more_like");

// SEED DB
const seedRoute = require("./database/seedRoute");

// MIDDLEWARES

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));

// PERSONAL MIDDLEWARES
app.use("/", registerRoute);
app.use("/", loginRoute);
app.use("/", verificationRoute);
app.use("/", seedRoute);
app.use("/", getPostsRoute);
app.use("/", getSpecPostRoute);
app.use("/", getUserRoute);
app.use("/", createPostRoute);
app.use("/", delPostRoute);
app.use("/", avatarRoute);
app.use("/", upVoteRoute);
app.use("/", editPostRoute);
app.use("/", moreLikeRoute);

// DB CONNECTION

mongoose.connect(`${process.env.DB_URI}`, (err) =>
  err ? console.log(err) : console.log("DB Connected")
);

// TEST

app.post(
  "/api/v1/upload",
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  async (req, res) => {
    // console.log(req.files.image.path);
    await cloudinary.uploader
      .upload(req.files.image.path)
      .then((result) => {
        // console.log(result);
        // console.log(result.url);
        res.json(result.url);
      })
      .catch((err) => console.log(err));
  }
);

// ROUTES

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = app;
