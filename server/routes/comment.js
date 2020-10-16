const express = require("express");
const commentController = require("../controller/comment");
const auth = require("./middleware/auth");

const router = express.Router();

router.post("/comment", auth, commentController.comment);
router.delete("/delete-comment", auth, commentController.deleteComment);

module.exports = router;
