const express = require("express");
const postController = require("../controller/post");
const auth = require("./middleware/auth");

const router = express.Router();

router.post("/post", auth, postController.post);

module.exports = router;
