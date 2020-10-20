const User = require("../../model/User");
const fs = require("fs");

module.exports = async (req, res) => {
  const userId = req.session.user.userId;
  try {
    await User.removeDP(req.con, userId);
    return res.status(200).send({ msg: "DP removed" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
