const express = require("express");
const followController = require("../controller/follow");
const auth = require("./middleware/auth");

const router = express.Router();

router.post("/follow", auth, followController.follow);
router.delete("/unfollow", auth, followController.unfollow);
router.get("/followers-count", auth, followController.followersCount);
router.get("/followers", auth, followController.followers);

module.exports = router;
