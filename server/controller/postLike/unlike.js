const PostLike = require("../../model/PostLike");

module.exports = async (req, res) => {
  let userId = req.session.user.userId,
    { postId } = req.body;
  try {
    await PostLike.deleteLike(req.con, userId, postId);
    return res.status(200).send({ msg: "Post unliked" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
