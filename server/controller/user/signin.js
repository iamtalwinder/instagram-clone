const bcrypt = require("bcryptjs");
const User = require("../../model/User");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await User.getUserByEmail(req.con, email);
    if (!result.length) {
      return res.status(406).send({
        field: "email",
        msg: "User with same E-mail doesn't exist",
      });
    }

    const validPassword = await bcrypt.compare(password, result[0].password);

    if (!validPassword) {
      return res.status(406).send({
        field: "password",
        msg: "Incorrect password",
      });
    }

    req.session.user = result[0];
    return res.status(200).send({ msg: "SignIn successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
