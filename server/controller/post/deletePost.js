const fs = require("fs");
const Post = require("../../model/Post");
const { deleteUpload } = require("../utils");

module.exports = async (req, res) => {
  const userId = req.session.user.userId,
    { postId } = req.query;
  try {
    const result = await Post.getPostByPostId(req.con, postId);
    if (!result.length) {
      return res.status(400).send({ msg: "No such post exists" });
    }

    await Post.deletePost(req.con, userId, postId);
    deleteUpload(result[0].path);

    return res.status(200).send({ msg: "Post has been deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
