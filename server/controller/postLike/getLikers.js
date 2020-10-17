const PostLike = require("../../model/PostLike");

module.exports = async (req, res) => {
  const { postId } = req.body;
  try {
    const likers = await PostLike.getLikers(req.con, postId);
    return res.status(200).send({ likers });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
