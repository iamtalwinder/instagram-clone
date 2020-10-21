const bcrypt = require("bcryptjs");
const Joi = require("joi");
const User = require("../../model/User");

const validate = (data) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    password: Joi.string().required(),
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
    const { user, password } = req.body;

    let result = await User.getUserByEmail(req.con, user);

    if (!result.length) {
      result = await User.getUserByUsername(req.con, user);
      if (!result.length) {
        return res.status(406).send({
          field: "user",
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

    return res.status(200).send({ user: result[0], msg: "Signin successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
