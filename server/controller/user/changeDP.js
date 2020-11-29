const User = require("../../model/User");
const { deleteUpload } = require("../utils");

module.exports = async (req, res) => {
  const userId = req.session.user.userId,
    { dpPath } = req.file;
  try {
    const result = await User.getUserById(req.con, userId);
    const prevDP = result[0].dpPath;

    await User.changeDP(req.con, userId, dpPath);
    deleteUpload(prevDP);

    return res.status(200).send({ dpPath: dpPath, msg: "DP changed" });
  } catch (err) {
    console.log(err);
    deleteUpload(dpPath);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
