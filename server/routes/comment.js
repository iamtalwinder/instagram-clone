const express = require("express");
const commentController = require("../controller/comment");
const auth = require("./middleware/auth");

const router = express.Router();

router.post("/post-comment", auth, commentController.postComment);
router.delete("/delete-comment", auth, commentController.deleteComment);
router.get("/get-comments", auth, commentController.getComments);

module.exports = router;
