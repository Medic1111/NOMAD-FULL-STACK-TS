// MODULES/PACKAGES
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();

// PERSONAL REQUIRES
const {
  registerRoute,
  loginRoute,
  verificationRoute,
} = require("./routes/auth");

const { User } = require("./models/database");

// MIDDLEWARES

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));

// PERSONAL MIDDLEWARES
app.use("/", registerRoute);
app.use("/", loginRoute);
app.use("/", verificationRoute);

// DB CONNECTION

mongoose.connect(`${process.env.DB_URI}`, (err) =>
  err ? console.log(err) : console.log("DB Connected")
);

// ROUTES

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = app;
