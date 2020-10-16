const express = require("express");
const commentController = require("../controller/comment");
const auth = require("./middleware/auth");

const router = express.Router();

router.post("/comment", auth, commentController.comment);

module.exports = router;
