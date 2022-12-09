const router = require("express").Router();
const { editPostControl } = require("../controllers/edit_post");

const editPostRoute = router.patch(
  "/api/v1/:username/posts/:id/edit",
  editPostControl
);

module.exports = editPostRoute;
