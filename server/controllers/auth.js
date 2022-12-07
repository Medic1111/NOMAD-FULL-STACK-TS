const { User } = require("../models/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerHandler = async (req, res) => {
  const { email, username, password } = req.body;

  if (!username || !email || password.length < 6) {
    return res.status(422).json({ message: "Invalid credentials" });
  }

  User.findOne(
    { $or: [{ username: username }, { email: email }] },
    (err, doc) => {
      if (doc) {
        return res
          .status(409)
          .json({ message: "Username or Email already registered" });
      }

      const hash = bcrypt.hashSync(password, 10);
      const token = jwt.sign(
        { username, email },
        `${process.env.TOKEN_SECRET}`,
        {
          expiresIn: "600s",
        }
      );

      const newUser = new User({
        email,
        username,
        password: hash,
      });

      newUser.save((err, doc) => {
        err
          ? res
              .status(500)
              .json({ message: "Failure on the server at this time" })
          : res.status(201).json({
              message: "User Registered Successfully",
              token,
              username: doc.username,
            });
      });
    }
  );
};

const loginHandler = (req, res) => {
  const { email, username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({ message: "All fields are required" });
  }

  User.findOne({ username }, (err, doc) => {
    if (!doc) {
      return res.status(404).json({ message: "Not Registered" });
    }
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
};

const verificationHandler = (req, res) => {
  let token = req.headers.authorization;
  console.log(token);

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
};

module.exports = { registerHandler, loginHandler, verificationHandler };
