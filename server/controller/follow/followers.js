const Follow = require("../../model/Follow");

module.exports = async (req, res) => {
  try {
    const result = await Follow.getFollowers(req.con, req.session.user.userId);
    return res.status(200).send({ followers: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
