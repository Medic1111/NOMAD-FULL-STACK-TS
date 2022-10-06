const express = require("express");
const route = express.Router();
const { registerHandler } = require("../controllers/auth");

const registerRoute = route.post("/register", registerHandler);

module.exports = { registerRoute };
