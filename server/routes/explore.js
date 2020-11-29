const express = require("express");
const exploreController = require("../controller/explore");
const auth = require("./middleware/auth");

const router = express.Router();

router.get("/explore", auth, exploreController.getExplore);

module.exports = router;
