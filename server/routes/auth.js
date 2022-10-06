const express = require("express");
const route = express.Router();
const {
  registerHandler,
  loginHandler,
  verificationHandler,
} = require("../controllers/auth");

const registerRoute = route.post("/api/register", registerHandler);

const loginRoute = route.post("/api/login", loginHandler);

const verificationRoute = route.get("/api/verification", verificationHandler);

module.exports = { registerRoute, loginRoute, verificationRoute };
