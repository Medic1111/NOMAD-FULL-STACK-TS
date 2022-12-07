const express = require("express");
const router = express.Router();
const { getPostsControl } = require("../controllers/get_posts");

const getPostsRoute = router.get("/api/v1/posts", getPostsControl);

module.exports = getPostsRoute;
