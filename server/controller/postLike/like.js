const PostLike = require("../../model/PostLike");
const Utils = require("../../model/Utils");
const PostLikes = require("../../model/PostLikes");

module.exports = async (req, res) => {
  let userId = req.session.user.userId,
    { postId } = req.body;
  try {
    const result = await PostLike.getLike(req.con, userId, postId);
    if (result.length) {
      return res.status(400).send({ msg: "You've already liked this post" });
    }
    await Utils.startTransaction(req.con);
    await PostLike.createLike(req.con, userId, postId);
    await PostLikes.increment(req.con, postId);
    await Utils.commit(req.con);
    return res.status(200).send({ msg: "Post liked" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
