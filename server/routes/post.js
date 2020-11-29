const express = require("express");
const postController = require("../controller/post");
const uploadImage = require("./middleware/uploadImage");
const resizePost = require("./middleware/resizePost");
const auth = require("./middleware/auth");

const router = express.Router();

router.post("/post", auth, uploadImage, resizePost, postController.post);
router.delete("/post", auth, postController.deletePost);
router.get("/user-posts", auth, postController.getUserPosts);

module.exports = router;
