const fs = require("fs");
const User = require("../../model/User");

module.exports = async (req, res, next) => {
  try {
    const userId = req.session.user.userId;

    const result = await User.getUserById(req.con, userId);

    const { dpPath } = result[0];

    if (dpPath) {
      fs.unlinkSync(`${dpPath}_thumb.jpeg`);
      fs.unlinkSync(`${dpPath}.jpeg`);
    }

    next();
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ msg: "An error has occurred while changing DP" });
  }
};
