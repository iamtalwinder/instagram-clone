const User = require("../../model/User");

module.exports = async (req, res) => {
  const signedInUser = req.session.user.userId;
  const { userToFind } = req.body;

  try {
    let result = await User.getUserProfile(req.con, signedInUser, userToFind);
    return res.status(200).send({ userProfile: result[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
