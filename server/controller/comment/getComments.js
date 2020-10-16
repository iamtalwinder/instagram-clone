const Comment = require("../../model/Comment");

module.exports = async (req, res) => {
  const { postId } = req.body;
  try {
    const comments = await Comment.getCommentsByPostId(req.con, postId);
    return res.status(200).send({ comments });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
