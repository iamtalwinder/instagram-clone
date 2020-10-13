const Follow = require("../../model/Follow");

module.exports = async (req, res) => {
  let userToFollow = req.body.userId,
    follower = req.session.user.userId;
  try {
    const result = await Follow.getFollow(req.con, userToFollow, follower);
    if (result.length) {
      return res.status(400).send({ msg: "Already following this user" });
    }
    await Follow.follow(req.con, userToFollow, follower);
    return res.status(200).send({ msg: "Follow successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
