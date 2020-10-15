const express = require("express");
const postController = require("../controller/post");
const auth = require("./middleware/auth");

const router = express.Router();

router.post("/post", auth, postController.post);
router.delete("/delete-post", auth, postController.deletePost);
router.get("/user-posts", auth, postController.userPosts);

module.exports = router;
