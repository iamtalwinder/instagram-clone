const bcrypt = require("bcryptjs");
const Joi = require("joi");
const User = require("../../model/User");
const Utils = require("../../model/Utils");
const Followers = require("../../model/Followers");
const Following = require("../../model/Following");

const validate = (data) => {
  const schema = Joi.object({
    fullname: Joi.string().min(1).max(30).required(),
    username: Joi.string().alphanum().min(3).max(15).required(),
    email: Joi.string().max(50).email().required(),
    password: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(data);
};

module.exports = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(406).send({
      field: error.details[0].context.label,
      msg: error.details[0].message,
    });
  }

  try {
    const { fullname, username, email, password } = req.body;

    let result = await User.getUserByUsername(req.con, username);

    if (result.length) {
      return res.status(409).send({
        field: "username",
        msg: "Username already in use",
      });
    }

    result = await User.getUserByEmail(req.con, email);

    if (result.length) {
      return res.status(409).send({
        field: "email",
        msg: "Email already in use",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Utils.startTransaction(req.con);

    await User.createUser(req.con, fullname, username, email, hashedPassword);

    result = await User.getUserByUsername(req.con, username);
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
