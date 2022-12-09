const router = require("express").Router();
const { getSpecPostControl } = require("../controllers/get_spec_post");

const getSpecPostRoute = router.get("/api/v1/posts/:id", getSpecPostControl);

module.exports = getSpecPostRoute;
