const PostLike = require("../../model/PostLike");

module.exports = async (req, res) => {
  let userId = req.session.user.userId,
    { postId } = req.body;
  try {
    const result = await PostLike.getLike(req.con, userId, postId);
    if (result.length) {
      return res.status(400).send({ msg: "You've already liked this post" });
    }
    await PostLike.createLike(req.con, userId, postId);
    return res.status(200).send({ msg: "Post liked" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
