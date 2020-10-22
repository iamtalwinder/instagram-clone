const fs = require("fs");
const Post = require("../../model/Post");
const Utils = require("../../model/Utils");

module.exports = async (req, res) => {
  const userId = req.session.user.userId,
    postId = req.body.postId;
  try {
    const result = await Post.getPostByPostId(req.con, postId);
    if (!result.length) {
      return res.status(400).send({ msg: "No such post exists" });
    }

    await Utils.startTransaction(req.con);
    await Post.deletePost(req.con, userId, postId);
    fs.unlinkSync(`${result[0].path}.jpeg`);
    fs.unlinkSync(`${result[0].path}_thumb.jpeg`);
    await Utils.commit(req.con);

    return res.status(200).send({ msg: "Post has been deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
