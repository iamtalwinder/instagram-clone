const Post = require("../../model/Post");

module.exports = async (req, res) => {
  const userId = req.session.user.userId;

  const { refresh, start, offset } = req.query;

  try {
    if (refresh) {
      await Post.dropTempPostTable(req.con, userId);
    }

    await Post.createTempPostTable(req.con, userId);
    let result = await Post.getPostsByUserId(
      req.con,
      userId,
      start || 0,
      offset || 12
    );

    return res.status(200).send({ posts: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
