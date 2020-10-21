const fs = require("fs");
const User = require("../../model/User");

module.exports = async (req, res) => {
  const userId = req.session.user.userId,
    { dpPath } = req.file;
  try {
    await User.changeDP(req.con, userId, dpPath);
    return res.status(200).send({ dpPath: dpPath, msg: "DP changed" });
  } catch (err) {
    console.log(err);

    fs.unlink(`${dpPath}_thumb.jpeg`, (err) => {
      if (err) console.log(err);
    });

    fs.unlink(`${dpPath}.jpeg`, (err) => {
      if (err) console.log(err);
    });
    return res.status(500).send({ msg: "Internal server error" });
  }
};
