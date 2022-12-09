const router = require("express").Router();
const { upVoteControl } = require("../controllers/up_vote");

const upVoteRoute = router.patch(
  "/api/v1/:username/posts/:id/upvote",
  upVoteControl
);

module.exports = upVoteRoute;
