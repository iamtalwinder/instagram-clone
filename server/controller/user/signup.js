const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const Utils = require("../../model/Utils");
const Followers = require("../../model/Followers");
const Following = require("../../model/Following");
const validation = require("./validation");

module.exports = async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  const { error } = validation.signup(req.body);
  if (error) {
    return res.status(406).send({
      field: error.details[0].context.label,
      msg: error.details[0].message,
    });
  }

  try {
    let result = await User.getUserByUserName(req.con, userName);

    if (result.length) {
      return res.status(406).send({
        field: "userName",
        msg: "Username already in use.",
      });
    }

    result = await User.getUserByEmail(req.con, email);

    if (result.length) {
      return res.status(406).send({
        field: "email",
        msg: "Email already in use.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Utils.startTransaction(req.con);

    await User.createUser(req.con, fullName, userName, email, hashedPassword);

    result = await User.getUserByUserName(req.con, userName);
    const user = result[0];

    await Followers.create(req.con, user.userId, 0);
    await Following.create(req.con, user.userId, 0);

    await Utils.commit(req.con);

    delete user.password;

    return res.status(201).send({ user: user, msg: "Signup successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
