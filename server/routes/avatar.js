const router = require("express").Router();
const { avatarControl } = require("../controllers/avatar");

const avatarRoute = router.put("/api/v1/:user/avatar", avatarControl);

module.exports = avatarRoute;
