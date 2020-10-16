const { v4: uuidv4 } = require("uuid");
const Post = require("../../model/Post");
const Comment = require("../../model/Comment");

module.exports = async (req, res) => {
  const userId = req.session.user.userId;
  const { postId, comment } = req.body;
  const commentId = uuidv4();
  try {
    const result = await Post.getPostByPostId(req.con, postId);
    if (!result.length) {
      return res.status(500).send({ msg: "No such post exists" });
    }
    await Comment.createComment(req.con, commentId, postId, userId, comment);
    return res
      .status(200)
      .send({ commentId: commentId, postId: postId, comment: comment });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
