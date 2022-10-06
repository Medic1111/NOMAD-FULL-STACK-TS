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

module.exports = { registerHandler };
