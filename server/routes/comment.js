const express = require("express");
const commentController = require("../controller/comment");
const auth = require("./middleware/auth");

const router = express.Router();

router.post("/comment", auth, commentController.postComment);
router.delete("/comment", auth, commentController.deleteComment);
router.get("/comments", auth, commentController.getComments);

module.exports = router;
