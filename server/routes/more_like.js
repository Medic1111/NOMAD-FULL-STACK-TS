const { moreLikeControl } = require("../controllers/more_like");
const router = require("express").Router();

const moreLikeRoute = router.get(
  "/api/v1/posts/morelikethis/:label",
  moreLikeControl
);

module.exports = moreLikeRoute;
