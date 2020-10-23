const User = require("../../model/User");
const { deleteUpload } = require("../utils");

module.exports = async (req, res) => {
  const userId = req.session.user.userId;
  try {
    const result = await User.getUserById(req.con, userId);
    const prevDP = result[0].dpPath;

    await User.removeDP(req.con, userId);
    deleteUpload(prevDP);

    return res.status(200).send({ msg: "DP removed" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
