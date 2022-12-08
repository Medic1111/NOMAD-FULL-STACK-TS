const router = require("express").Router();
const { delPostControl } = require("../controllers/del_post");

const delPostRoute = router.put(
  "/api/v1/:username/posts/delete/:id",
  delPostControl
);

module.exports = delPostRoute;
