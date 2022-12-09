const { seedControl } = require("./seedControl");
const router = require("express").Router();

const seedRoute = router.put("/api/dev/db/seed/mock", seedControl);

module.exports = seedRoute;
