const Follow = require("../../model/Follow");

module.exports = async (req, res) => {
  let userToUnfollow = req.body.userId,
    follower = req.session.user.userId;
  try {
    await Follow.deleteFollow(req.con, userToUnfollow, follower);
    return res.status(200).send({ msg: "Unfollow successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
