const express = require("express");
const router = express.Router();
const { getUserControl } = require("../controllers/get_user");

const getUserRoute = router.get("/api/v1/users/:username", getUserControl);

module.exports = getUserRoute;
