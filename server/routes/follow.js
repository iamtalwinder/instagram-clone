const express = require("express");
const followController = require("../controller/follow");
const auth = require("./middleware/auth");

const router = express.Router();

router.post("/follow", auth, followController.follow);

module.exports = router;
