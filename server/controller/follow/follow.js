const Follow = require("../../model/Follow");
const Followers = require("../../model/Followers");
const Following = require("../../model/Following");
const Utils = require("../../model/Utils");

module.exports = async (req, res) => {
  let userToFollow = req.body.userId,
    follower = req.session.user.userId;
  try {
    const result = await Follow.getFollow(req.con, userToFollow, follower);
    if (result.length) {
      return res.status(400).send({ msg: "Already following this user" });
    }
    await Utils.startTransaction(req.con);
    await Follow.createFollow(req.con, userToFollow, follower);
    await Followers.increment(req.con, userToFollow);
    await Following.increment(req.con, follower);
    await Utils.commit(req.con);
    return res.status(200).send({ msg: "Follow successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
