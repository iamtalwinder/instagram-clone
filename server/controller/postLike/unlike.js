const PostLike = require("../../model/PostLike");
const Utils = require("../../model/Utils");
const PostLikes = require("../../model/PostLikes");

module.exports = async (req, res) => {
  let userId = req.session.user.userId,
    { postId } = req.body;
  try {
    await Utils.startTransaction(req.con);
    await PostLike.deleteLike(req.con, userId, postId);
    await PostLikes.decrement(req.con, postId);
    await Utils.commit(req.con);
    return res.status(200).send({ msg: "Post unliked" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
