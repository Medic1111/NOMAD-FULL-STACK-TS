const router = require("express").Router();
const { createPostControl } = require("../controllers/create_post");

const createPostRoute = router.post("/api/v1/posts/new", createPostControl);

module.exports = createPostRoute;
