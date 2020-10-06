const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const validation = require("./validation");

module.exports = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { error } = validation.signup(req.body);
  if (error) {
    return res.status(406).send({
      field: error.details[0].context.label,
      msg: error.details[0].message,
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.createUser(req.con, firstName, lastName, email, hashedPassword);

    return res.status(201).send({ msg: "User has been created." });
  } catch (err) {
    if (err.errno === 1062) {
      return res.status(400).send({
        field: "email",
        msg: "User with the same email already exists",
      });
    }

    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
