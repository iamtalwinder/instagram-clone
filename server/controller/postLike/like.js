const PostLike = require("../../model/PostLike");
const Post = require("../../model/Post");

module.exports = async (req, res) => {
  let userId = req.session.user.userId,
    { postId } = req.body;
  try {
    const result = await Post.getPostByPostId(req.con, postId);
    if (!result.length) {
      return res.status(400).send({ msg: "No such post exists" });
    }
    await PostLike.createLike(req.con, userId, postId);
    return res.status(200).send({ msg: "Post liked" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
