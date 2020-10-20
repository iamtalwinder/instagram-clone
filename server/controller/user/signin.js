const bcrypt = require("bcryptjs");
const User = require("../../model/User");

module.exports = async (req, res) => {
  const { user, password } = req.body;

  try {
    let result = await User.getUserByEmail(req.con, user);
    if (!result.length) {
      result = await User.getUserByUserName(req.con, user);
      if (!result.length) {
        return res.status(406).send({
          field: "Username or email",
          msg: "No such username or email exists",
        });
      }
    }

    const userInfo = result[0];

    const validPassword = await bcrypt.compare(password, userInfo.password);

    if (!validPassword) {
      return res.status(406).send({
        field: "password",
        msg: "Incorrect password",
      });
    }

    delete userInfo.password;
    req.session.user = userInfo;

    result = await User.getUserProfile(
      req.con,
      userInfo.userId,
      userInfo.userId
    );
    delete result[0].isFollowing;
    result[0].email = userInfo.email;

    return res.status(200).send({ user: result[0], msg: "SignIn successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
