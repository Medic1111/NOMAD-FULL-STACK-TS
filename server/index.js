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
const { registerRoute } = require("./routes/auth");
const { User } = require("./models/database");

// MIDDLEWARES

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));

// PERSONAL MIDDLEWARES
app.use("/", registerRoute);

// DB CONNECTION

mongoose.connect(`${process.env.DB_URI}`, (err) =>
  err ? console.log(err) : console.log("DB Connected")
);

// ROUTES

app.post("/login", (req, res) => {
  const { email, username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({ message: "All fields are required" });
  }

  User.findOne({ username }, (err, doc) => {
    if (doc) {
      bcrypt.compare(password, doc.password, (err, match) => {
        if (!match) {
          return res.status(403).json({ message: "Not auth" });
        }
        let token;
        token = jwt.sign({ username }, `${process.env.TOKEN_SECRET}`, {
          expiresIn: "600s",
        });
        res.status(200).json({ username: doc.username, token: token });
      });
    }
  });
});

app.get("/api/verification", (req, res) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "No token found" });
  } else {
    jwt.verify(token, `${process.env.TOKEN_SECRET}`, (err, verified) => {
      console.log(err);
      err
        ? res.status(401).json({ message: "Not Auth...." })
        : res.status(200).send("Yoohoo");
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = app;
