const { v4: uuidv4 } = require("uuid");
const Post = require("../../model/Post");
const Comment = require("../../model/Comment");
const Comments = require("../../model/Comments");
const Utils = require("../../model/Utils");

module.exports = async (req, res) => {
  const userId = req.session.user.userId;
  const { postId, comment } = req.body;
  const commentId = uuidv4();
  try {
    const result = await Post.getPostByPostId(req.con, postId);
    if (!result.length) {
      return res.status(500).send({ msg: "No such post exists" });
    }
    await Utils.startTransaction(req.con);
    await Comment.createComment(req.con, commentId, postId, userId, comment);
    await Comments.increment(req.con, postId);
    await Utils.commit(req.con);
    return res
      .status(200)
      .send({ commentId: commentId, postId: postId, comment: comment });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
