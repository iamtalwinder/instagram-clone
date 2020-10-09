const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const validation = require("./validation");
const { getUserByUserName, getUserByEmail } = require("../../model/User");

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
    let result = await getUserByUserName(req.con, userName);
    if (result.length) {
      return res.status(406).send({
        field: "userName",
        msg: "Username already in use.",
      });
    }

    result = await getUserByEmail(req.con, email);
    if (result.length) {
      return res.status(406).send({
        field: "email",
        msg: "Email already in use.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.createUser(req.con, fullName, userName, email, hashedPassword);

    return res.status(201).send({ msg: "User has been created." });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
