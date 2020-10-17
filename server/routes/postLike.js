const express = require("express");
const postLikeController = require("../controller/postLike");
const auth = require("./middleware/auth");

const router = express.Router();

router.post("/like", auth, postLikeController.like);
router.delete("/unlike", auth, postLikeController.unlike);

module.exports = router;
