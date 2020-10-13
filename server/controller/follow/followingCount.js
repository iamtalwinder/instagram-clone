const Follow = require("../../model/Follow");

module.exports = async (req, res) => {
  try {
    const result = await Follow.getFollowingCount(
      req.con,
      req.session.user.userId
    );
    return res.status(200).send({ followingCount: result[0].COUNT });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
