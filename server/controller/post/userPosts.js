const Post = require("../../model/Post");

module.exports = async (req, res) => {
  const userId = req.session.user.userId;

  const { start, offset } = req.query;

  try {
    await Post.createTempPostTable(req.con, userId);
    let result;
    if (start && offset) {
      result = await Post.getPostsByUserId(req.con, userId, start, offset);
    } else {
      result = await Post.getPostsByUserId(req.con, userId);
    }

    return res.status(200).send({ posts: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
