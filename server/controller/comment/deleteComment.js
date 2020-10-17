const Comment = require("../../model/Comment");

module.exports = async (req, res) => {
  const userId = req.session.user.userId;
  const { commentId } = req.body;
  try {
    await Comment.deleteComment(req.con, userId, commentId);
    return res.status(200).send({ msg: "Comment deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
