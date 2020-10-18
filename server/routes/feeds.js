const express = require("express");
const feedsController = require("../controller/feeds");
const auth = require("./middleware/auth");

const router = express.Router();

router.get("/feeds", auth, feedsController.getFeeds);

module.exports = router;
