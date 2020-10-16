const express = require("express");
const followController = require("../controller/follow");
const auth = require("./middleware/auth");

const router = express.Router();

router.post("/follow", auth, followController.follow);
router.delete("/unfollow", auth, followController.unfollow);
router.get("/followers-count", auth, followController.getFollowersCount);
router.get("/followers", auth, followController.getFollowers);
router.get("/following-count", auth, followController.getFollowingCount);
router.get("/following", auth, followController.getFollowing);

module.exports = router;
