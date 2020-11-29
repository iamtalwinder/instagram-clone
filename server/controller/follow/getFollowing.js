const Follow = require("../../model/Follow");

module.exports = async (req, res) => {
  try {
    const userId = req.body.userId || req.session.user.userId;

    const following = await Follow.getFollowing(req.con, userId);
    return res.status(200).send({ following: following });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
