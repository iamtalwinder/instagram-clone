const fs = require("fs");
const Post = require("../../model/Post");
const PostLikes = require("../../model/PostLikes");
const Comments = require("../../model/Comments");
const Utils = require("../../model/Utils");

module.exports = async (req, res) => {
  const userId = req.session.user.userId;
  const { postId, filePath } = req.file;
  try {
    await Utils.startTransaction(req.con);
    await Post.createPost(
      req.con,
      postId,
      userId,
      filePath,
      req.body.caption || null
    );
    await PostLikes.create(req.con, postId, 0);
    await Comments.create(req.con, postId, 0);
    await Utils.commit(req.con);
    res.status(200).send({ postId: postId, msg: "Uploaded" });
  } catch (err) {
    console.log(err);
    fs.unlink(`${filePath}.jpeg`);
    fs.unlink(`${filePath}_thumb.jpeg`);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
